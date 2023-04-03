using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using react_weatherapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Data;
using react_weatherapp.Helpers;




namespace react_weatherapp.Controllers
{

    /******************************         User Login           *****************************/
    // Self explanitory
    [ApiController]
    [Route("auth/[controller]")]
    public class LoginController : Controller
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        public LoginController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // Create Post route to log user in
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            // Retrieve the user from the database by email
            var data = _context.Users.SingleOrDefault(u => u.Email == user.Email);

            // Check if user exists and password is valid
            if (data != null && BCrypt.Net.BCrypt.Verify(user.Password, data.Password))
            {
                // Password is valid, generate and return token
                var token = TokenHelper.GenerateToken(data, _config);
                return Ok(token);
            }

            // User not found or password is invalid
            return NotFound("user not found or password is invalid");
        }
    }

    /******************************         User Registration           *****************************/
    // This uses vanilla C# with EF to use our generate token function
    [Route("auth/[controller]")]
    [ApiController]
    public class Registration : Controller
    {
        Connection Conn;
        public readonly IConfiguration _config;
        public readonly AppDbContext _context;
        public Registration(AppDbContext context, IConfiguration config, Connection _CONN)
        {
            Conn = _CONN;
            _context = context;
            _config = config;
        }

        // Create the post route for registering
        [HttpPost]
        public IActionResult Register([FromBody] User user)
        {

            // Create sql connection and store the data into the DB using a stored procedure
            SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
            Conn.connectionstring = myConnection.ConnectionString;
            SqlCommand myCommand = new SqlCommand("usp_Registration", myConnection);
            myCommand.CommandType = CommandType.StoredProcedure;


            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Add the values from the body of the page that will be passed to the stored procedure
            myCommand.Parameters.AddWithValue("@email", user.Email);
            myCommand.Parameters.AddWithValue("@name", user.Name);
            myCommand.Parameters.AddWithValue("@password", hashedPassword);
            myCommand.Parameters.AddWithValue("@suggestionSetting", "On");

            // This is where we make it happen cap'n
            myConnection.Open();
            myCommand.ExecuteNonQuery();
            myConnection.Close();


            var data = _context.Users.SingleOrDefault(u => u.Email == user.Email);
            bool validPassword = BCrypt.Net.BCrypt.Verify(user.Password, hashedPassword);


            /* If the arguements we passed it are not null, which means the stored procedure worked correctly,
            we log the user in here */
            if (data != null && validPassword)
            {
                var token = TokenHelper.GenerateToken(data, _config);
                return Ok(token);
            }
            return NotFound("user not found");
        }
    }



    /******************   RETURN ALL USER NAMES/EMAILS     ***********************/
    // We will run a check against this returned data on the front end
    [Route("auth/[controller]")]
    [ApiController]
    public class Authenticate : Controller
    {
        Connection Conn;
        public Authenticate(Connection _CONN)
        {
            Conn = _CONN;
        }

        DataTable table = new DataTable();
        
        [HttpGet] 
        public IActionResult Authenication()
        {
            try {
                // Create sql connection and store the data into the DB using a stored procedure
                SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
                Conn.connectionstring = myConnection.ConnectionString;
                SqlCommand myCommand = new SqlCommand("usp_ReturnUsers", myConnection);
                myCommand.CommandType = CommandType.StoredProcedure;

                myConnection.Open();

                SqlDataReader reader = myCommand.ExecuteReader();
                table.Load(reader);
                myConnection.Close();

            } catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occured while retrieving data");
            }
            return new JsonResult(table);
        }
    }


    /*******************      RELOG USER        ***********************/
    //  If the user was previously logged in we will run this without forcing them to use password again
    [Route("auth/Prelogged")]
    [ApiController]

    public class Prelogged : Controller
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        public Prelogged(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost]
        public IActionResult Relog([FromBody] User user)
        {
            var data = _context.Users.SingleOrDefault(u => u.Email == user.Email && u.UserId == user.UserId);
            if (data != null)
            {
                var token = TokenHelper.GenerateToken(data, _config);
                return Ok(token);
            }

            return NotFound("user not found");
        }
    }


    /*****************     VERIFY PASSWORD      *************************/
   // Check the users current password before allowing user to change it
    [Route("auth/CheckPassword")]
    [ApiController]

    public class CheckPassword : Controller
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;

        public CheckPassword(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost]
        public IActionResult CheckTrue([FromBody] User user)
            
        {
            var data = _context.Users.SingleOrDefault(u => u.UserId == user.UserId);
            if (BCrypt.Net.BCrypt.Verify(user.Password, data.Password)) 
            {
                return new JsonResult("Password Matches");   
            }
            return new JsonResult("Incorrect");
        }
    }
}
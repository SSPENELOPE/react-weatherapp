
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using react_weatherapp.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Data;
using react_weatherapp.Helpers;


namespace react_weatherapp.Controllers
{

    /******************************         User Login           *****************************/
    [ApiController]
    [Route("auth/[controller]")]
    public class LoginController : ControllerBase
    {
        Connection Conn;
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        public LoginController(AppDbContext context, IConfiguration config, Connection _CONN)
        {
            Conn = _CONN;
            _context = context;
            _config = config;
        }

        // Create Post route to log user in
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            // Configure options we need to connect to our DB
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(Conn.connectionstring);
            
            // Instantiate an instace of our AppDbContext, pass it the arguements from the body
            using (var context = new AppDbContext(optionsBuilder.Options))
            {
                var data = context.Users.SingleOrDefault(u => u.Email == user.Email && u.Password == user.Password);

                 /* If the arguements from the body exist in the DB,
                 we will log the user in by generating a token with the users data attached to it */
                if (data != null)
                {
                    var token = GenerateToken(data);
                    return Ok(token);
                }

                return NotFound("user not found");

            }
        }

        // function to Generate Token for the user
        private IActionResult GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
            var userIdClaim = new Claim("userId", user.Id.ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // This is where we can attach any "user data" or adjust the "payload" of the jwt
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(ClaimTypes.Name,user.Name),
                    userIdClaim
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            // Return JWT token in JSON format
            return Ok(new { token = jwt });
        }

    }



    /******************************         User Registration           *****************************/
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
        public ActionResult Register([FromBody] User user)
        {

            // Create sql connection and store the data into the DB using a stored procedure
            SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
            Conn.connectionstring = myConnection.ConnectionString;
            SqlCommand myCommand = new SqlCommand("usp_Registration", myConnection);
            myCommand.CommandType = CommandType.StoredProcedure;

            // Add the values from the body of the page that will be passed to the stored procedure
            myCommand.Parameters.AddWithValue("@email", user.Email);
            myCommand.Parameters.AddWithValue("@name", user.Name);
            myCommand.Parameters.AddWithValue("@password", user.Password);

            // This is where we make it happen cap'n
            myConnection.Open();
            int i = myCommand.ExecuteNonQuery();
            myConnection.Close();

            // Create the options we will need to connect to our db
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(Conn.connectionstring);

            // Instantiate an instance of AppDbContext, pass it the arguements from the body
            using (var context = new AppDbContext(optionsBuilder.Options))
            {
                var data = context.Users.SingleOrDefault(u => u.Email == user.Email && u.Password == user.Password);

                 /* If the arguements we passed it are not null, which means the stored procedure worked correctly,
                 we log the user in here */
                if (data != null)
                {
                    var token = GenerateToken(data);
                    return Ok(token);
                }

                return NotFound("user not found");

            }
        }

        // Function to Generate Token for the user
        private IActionResult GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
            var userIdClaim = new Claim("userId", user.Id.ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // This is where we can attach any "user data" or adjust the "payload" of the jwt
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(ClaimTypes.Name,user.Name),
                    userIdClaim
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            // Return JWT token in JSON format
            return Ok(new { token = jwt });
        }
    }

}
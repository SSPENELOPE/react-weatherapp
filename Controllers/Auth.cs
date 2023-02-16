
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
        private readonly IConfiguration _config;

        private readonly AppDbContext _context;

        public LoginController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(connectionString);

            using (var context = new AppDbContext(optionsBuilder.Options))
            {
                var data = context.Users.SingleOrDefault(u => u.Email == user.Email && u.Password == user.Password);

                if (data != null)
                {
                    var token = GenerateToken(data);
                    return Ok(token);
                }

                return NotFound("user not found");

            }
        }

        // Generate Token for the user
        private IActionResult GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
            var userIdClaim = new Claim("userId", user.Id.ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
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

        //To authenticate user
        // Not sure when or how I would need this, saving it in the event I find a use for it later
    /*     private User? Authenticate(UserLogin userLogin)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            var currentUser = UserConstants.Users.FirstOrDefault(x => x.Email.ToLower() ==
                userLogin.Email.ToLower() && x.Password == userLogin.Password);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        } */
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

        [HttpPost]
        public ActionResult Register([FromBody] User user)
        {

            SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
            Conn.connectionstring = myConnection.ConnectionString;
            SqlCommand myCommand = new SqlCommand("usp_Registration", myConnection);
            myCommand.CommandType = CommandType.StoredProcedure;
            myCommand.Parameters.AddWithValue("@email", user.Email);
            myCommand.Parameters.AddWithValue("@name", user.Name);
            myCommand.Parameters.AddWithValue("@password", user.Password);

            myConnection.Open();
            int i = myCommand.ExecuteNonQuery();
            myConnection.Close();

            var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(connectionString);
            using (var context = new AppDbContext(optionsBuilder.Options))
            {
                var data = context.Users.SingleOrDefault(u => u.Email == user.Email && u.Password == user.Password);

                if (data != null)
                {
                    var token = GenerateToken(data);
                    return Ok(token);
                }

                return NotFound("user not found");

            }




        }

        // Generate Token for the user
        private IActionResult GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
            var userIdClaim = new Claim("userId", user.Id.ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
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
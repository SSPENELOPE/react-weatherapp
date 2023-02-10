
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System;
using System.Configuration;
using react_weatherapp.Models;


namespace react_weatherapp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class UserQuery : ControllerBase 
    {
        private readonly IConfiguration _configuration;
        public UserQuery(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
        string password = _configuration["ConnString:Password"];
        DataTable table = new DataTable();
        try
            {
            
            SqlConnectionStringBuilder conn = new SqlConnectionStringBuilder();
                conn.DataSource = "react-weatherapp.database.windows.net";
                conn.UserID = "SSPENELOPE";
                conn.Password = password;
                conn.InitialCatalog = "weather_db";
            
         
       
            using(SqlConnection myConnection = new SqlConnection(conn.ConnectionString)) 
            {

                string query = @"
                    select * from [dbo].[user]
                ";
                using(SqlCommand myCommand = new SqlCommand(query, myConnection)) 
                {
                myConnection.Open();
                        using(SqlDataReader reader = myCommand.ExecuteReader()) 
                        {
                            table.Load(reader);
                            reader.Close();
                            myConnection.Close();
                        }
                }
            }
            } catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return new JsonResult(table);
        }
        
    }
    
    // Temporarily leaving this commented out until we can find users with a SQLdb query
    [ApiController]
    [Route("auth/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        public LoginController(IConfiguration config) => _config = config;

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }

            return NotFound("user not found");
        }

        // To generate token
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
#pragma warning disable CS8604 // Possible null reference argument.
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Email)
               
            };
#pragma warning restore CS8604 // Possible null reference argument.
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //To authenticate user
        private User? Authenticate(UserLogin userLogin)
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
        }
    }
}
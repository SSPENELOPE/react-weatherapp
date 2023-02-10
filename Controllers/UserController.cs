using Microsoft.AspNetCore.Mvc;
using react_weatherapp.Models;
using System.Data;
using System.Data.SqlClient;

namespace react_weatherapp.Controllers
{
    // Find all users, Will be updated to single user search later for login purposes
    [Route("api/[controller]")]
    [ApiController]

    public class UserQuery : Controller
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
            string userId = _configuration["ConnString:User"];
            string source = _configuration["ConnString:Source"];
            string catalog = _configuration["ConnString:Catalog"];
            DataTable table = new DataTable();

            try
            {
                SqlConnectionStringBuilder conn = new SqlConnectionStringBuilder();
                conn.DataSource = source;
                conn.UserID = userId;
                conn.Password = password;
                conn.InitialCatalog = catalog;



                using (SqlConnection myConnection = new SqlConnection(conn.ConnectionString))
                {

                    string query = @"
                    select * from [dbo].[user]
                ";
                    using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                    {
                        myConnection.Open();
                        using (SqlDataReader reader = myCommand.ExecuteReader())
                        {
                            table.Load(reader);
                            reader.Close();
                            myConnection.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return new JsonResult(table);
        }

    }

    // Create User Route
    [Route("api/[controller]")]
    [ApiController]

    public class CreateUser : Controller
    {
        private readonly IConfiguration _configuration;
        public CreateUser(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Post(User user)
        {
            string password = _configuration["ConnString:Password"];
            string userId = _configuration["ConnString:User"];
            string source = _configuration["ConnString:Source"];
            string catalog = _configuration["ConnString:Catalog"];
            DataTable table = new DataTable();
            try
            {

                SqlConnectionStringBuilder conn = new SqlConnectionStringBuilder();
                conn.DataSource = source;
                conn.UserID = userId;
                conn.Password = password;
                conn.InitialCatalog = catalog;



                using (SqlConnection myConnection = new SqlConnection(conn.ConnectionString))
                {

                    string query = @"
                    insert into [dbo].[user]
                    values(@Email,@Password)
                ";
                    using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@Email", user.Email);
                        myCommand.Parameters.AddWithValue("@Password", user.Password);
                        myConnection.Open();
                        using (SqlDataReader reader = myCommand.ExecuteReader())
                        {
                            table.Load(reader);
                            reader.Close();
                            myConnection.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return new JsonResult("User Created Sucessfuly!");
        }
    }

    // Update User Route
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateUser : Controller
    {
        private readonly IConfiguration _configuration;
        public UpdateUser(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPut]
        public JsonResult Put(User user)
        {
            string password = _configuration["ConnString:Password"];
            string userId = _configuration["ConnString:User"];
            string source = _configuration["ConnString:Source"];
            string catalog = _configuration["ConnString:Catalog"];
            DataTable table = new DataTable();
            try
            {

                SqlConnectionStringBuilder conn = new SqlConnectionStringBuilder();
                conn.DataSource = source;
                conn.UserID = userId;
                conn.Password = password;
                conn.InitialCatalog = catalog;



                using (SqlConnection myConnection = new SqlConnection(conn.ConnectionString))
                {

                    string query = @"
                    update [dbo].[user]
                    set Email = @Email,
                    Password = @Password
                    where Id = @Id
                ";
                    using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@Id", user.Id);
                        myCommand.Parameters.AddWithValue("@Email", user.Email);
                        myCommand.Parameters.AddWithValue("@Password", user.Password);
                        myConnection.Open();
                        using (SqlDataReader reader = myCommand.ExecuteReader())
                        {
                            table.Load(reader);
                            reader.Close();
                            myConnection.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return new JsonResult("User Updated Sucessfuly");
        }
    }


    // Update User Route
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteUser : Controller
    {
        private readonly IConfiguration _configuration;
        public DeleteUser(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string password = _configuration["ConnString:Password"];
            string userId = _configuration["ConnString:User"];
            string source = _configuration["ConnString:Source"];
            string catalog = _configuration["ConnString:Catalog"];
            DataTable table = new DataTable();
            try
            {

                SqlConnectionStringBuilder conn = new SqlConnectionStringBuilder();
                conn.DataSource = source;
                conn.UserID = userId;
                conn.Password = password;
                conn.InitialCatalog = catalog;



                using (SqlConnection myConnection = new SqlConnection(conn.ConnectionString))
                {

                    string query = @"
                    delete from [dbo].[user]
                    where id = @id
                ";
                    using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@Id", id);
                        myConnection.Open();
                        using (SqlDataReader reader = myCommand.ExecuteReader())
                        {
                            table.Load(reader);
                            reader.Close();
                            myConnection.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return new JsonResult("User Deleted Sucessfuly");
        }
    }

}

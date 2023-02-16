using react_weatherapp.Controllers;
using Microsoft.AspNetCore.Mvc;
using react_weatherapp.Helpers;
using react_weatherapp.Models;
using System.Data;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace react_weatherapp.Controllers
{

    /**********************           FIND ALL USERS                  ***************************/
    [Route("api/[controller]")]
    [ApiController]
    public class FindAllUsers : Controller
    {
        Connection Conn;
        public FindAllUsers(Connection _CONN)
        {
            Conn = _CONN;
        }


        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();

            try
            {
                string query = @"
                          select * from [dbo].[user]
                      ";
                SqlConnection conn = new SqlConnection(Conn.connectionstring);
                Conn.connectionstring = conn.ConnectionString;
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader reader = cmd.ExecuteReader();
                table.Load(reader);
                reader.Close();
                conn.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return new JsonResult(table);
        }
    }

    /**************************************************         GET INDIVIDUAL USER BY ID            **************************************/
    // May be needed later for favorited items etc.. All need userinformation is stored in the Jwt
    [Route("api/[controller]")]
    [ApiController]
    public class GetUser : Controller
    {
        Connection Conn;
        public GetUser(Connection _CONN)
        {
            Conn = _CONN;
        }


        [HttpPost]
        public JsonResult Get(User user)
        {
            DataTable table = new DataTable();

            try
            {
                string query = @"
                        SELECT * FROM [dbo].[user]
                          where Id = @Id
                      ";
                SqlConnection conn = new SqlConnection(Conn.connectionstring);
                Conn.connectionstring = conn.ConnectionString;

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", user.Id);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                table.Load(reader);
                reader.Close();
                conn.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return new JsonResult(table);
        }
    }

    /**************************************************             Update User Information             *********************************/
    // Update User Route
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateUser : Controller
    {
        Connection Conn;
        public UpdateUser(Connection _CONN)
        {
            Conn = _CONN;
        }


        [HttpPut]
        public JsonResult Put(User user)
        {
            DataTable table = new DataTable();
            try
            {
                using (SqlConnection myConnection = new SqlConnection(Conn.connectionstring))
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

    /**************************************************             Delete User             *********************************/
    // Delete User Route
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteUser : Controller
    {
        Connection Conn;
        public DeleteUser(Connection _CONN)
        {
            Conn = _CONN;
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            DataTable table = new DataTable();
            try
            {
                using (SqlConnection myConnection = new SqlConnection(Conn.connectionstring))
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






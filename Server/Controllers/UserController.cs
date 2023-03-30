using Microsoft.AspNetCore.Mvc;
using react_weatherapp.Helpers;
using react_weatherapp.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore; // Will use EF later

namespace react_weatherapp.Controllers
{

    // TODO: Refactor All the routes that can be merged into one [ApiController] class using EF.

    /**********************      FIND ALL USERS     ***************************/
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
                        myCommand.Parameters.AddWithValue("@Id", user.UserId);
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


    /**************************************************          Get/Add User Favorited Cities        *********************************/

    [Route("api/[controller]")]
    [ApiController]
    public class Favorites : Controller
    {
        Connection Conn;

        public Favorites(Connection _CONN)
        {
            Conn = _CONN;
        }

        DataTable table = new DataTable();

        [HttpGet("{userId}")]
        public IActionResult GetFavorites(int userId)
        {
            // Try and retreive users saved favorites
            try
            {
                // Create SQL connection
                SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
                Conn.connectionstring = myConnection.ConnectionString;

                // Create command, we tell it that its a stored procedure, then add the values
                SqlCommand cmd = new SqlCommand("GetFavoritesByUserId", myConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", userId);

                // Open our connection
                myConnection.Open();

                // Use an instance of SqlDataReader
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    table.Load(reader);
                    reader.Close();
                    myConnection.Close();
                }
                // If the user does not have a saved data table
                if (table.Rows.Count == 0)
                {
                    return new JsonResult("No data");
                }
                // If they do, we return the data
                else
                {
                    return new JsonResult(table);
                }

            }

            // Catch any errors
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occurred while fetching favorites");
            }

        }


        [HttpPost]
        public IActionResult AddFavoriteCity([FromBody] Favorite favorite)
        {

            try
            {
                // Create SQL connection
                SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
                Conn.connectionstring = myConnection.ConnectionString;

                // Create command, we tell it that its a stored procedure, then add the values
                SqlCommand myCommand = new SqlCommand("AddFavoriteCity", myConnection);
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Parameters.AddWithValue("@UserId", favorite.UserId);
                myCommand.Parameters.AddWithValue("@City", favorite.FavCity);

                // This is where we make it happen cap'n
                myConnection.Open();
                int i = Convert.ToInt32(myCommand.ExecuteScalar());
                myConnection.Close();


                if (i <= 0)
                {
                    return new NotFoundObjectResult("Something went wrong");
                }
                else
                {
                    return CreatedAtAction(nameof(GetFavorites), new { userId = favorite.UserId }, favorite);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new BadRequestObjectResult("An error occurred while adding favorite city");
            }
        }

        [HttpDelete("{favId}")]
        public IActionResult DeleteFavoriteCity(int favId)
        {
            // Try and retreive users saved favorites
            try
            {
                // Create SQL connection
                SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
                Conn.connectionstring = myConnection.ConnectionString;

                // Create command, we tell it that its a stored procedure, then add the values
                SqlCommand cmd = new SqlCommand("usp_DeleteFavoriteCity", myConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FavId", favId);

                // Open our connection
                myConnection.Open();
                // Execute the command
                cmd.ExecuteNonQuery();
                myConnection.Close();

            }

            // Catch any errors
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occurred while removing your saved item");
            }
            return new JsonResult("Removed City");
        }
    }


    /****************************** Edit the users data ***********************/
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class Edit : Controller
    {
         Connection Conn;

        public Edit(Connection _CONN)
        {
            Conn = _CONN;
        }

        [HttpPut]
        public IActionResult UpdateUsername(User user) {
            try {
                   // Create SQL connection
                SqlConnection myConnection = new SqlConnection(Conn.connectionstring);
                Conn.connectionstring = myConnection.ConnectionString;

                // Create command, we tell it that its a stored procedure, then add the values
                SqlCommand cmd = new SqlCommand("usp_UpdateUsername", myConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", user.UserId);
                cmd.Parameters.AddWithValue("@name", user.Name);

                // Execute it
                myConnection.Open();
                cmd.ExecuteNonQuery();
                myConnection.Close();

            } catch(Exception ex) {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occured while updating your username");
            }
             return new JsonResult("Successfuly upadted Username");
        }

    }
}






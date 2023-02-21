
using Microsoft.EntityFrameworkCore;
using react_weatherapp.Models;


namespace react_weatherapp
{
     
    public class AppDbContext : DbContext
    {

        public DbSet<User>? Users { get; set; }
        public AppDbContext(System.Data.SqlClient.SqlConnection myConnection) { }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public AppDbContext(string? defaultConnection)
        {
        }
    }

}
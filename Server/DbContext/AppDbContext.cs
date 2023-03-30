using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using react_weatherapp.Models;


namespace react_weatherapp
{

    public class AppDbContext : DbContext
    {

        public DbSet<User>? Users { get; set; }

       /*  public DbSet<Favorite>? Favorites { get; set; } */

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}


// This is for later use with entity FW. I still have some research and learning todo before implementing it

/*   protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Favorite>()
        .MapToStoredProcedures(s =>
        {
            s.Insert(i => i.HasName("InsertFavoriteCity").Parameter(p => p.CityName, "CityName").Parameter(p => p.UserId, "UserId"));
            s.Delete(d => d.HasName("DeleteFavoriteCity").Parameter(p => p.Id, "Id"));
            s.Update(u => u.HasName("UpdateFavoriteCity").Parameter(p => p.Id, "Id").Parameter(p => p.CityName, "CityName"));
        });
}
  */



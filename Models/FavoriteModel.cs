using System.ComponentModel.DataAnnotations.Schema;

namespace react_weatherapp.Models
{
    [Table("favorites")]
    public class Favorite
    {
        public int FavId { get; set; }
        public string? FavCity { get; set; }
        public int UserId { get; set; }  // Foreign Key

    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace react_weatherapp.Models
{
    [Table("user")]
    public class User
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? SuggestionSetting { get; set; }
    }
}
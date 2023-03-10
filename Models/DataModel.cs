using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace react_weatherapp.Models
{
public class CityData
{
    [JsonProperty("name")]
    public string? Name { get; set; }
}
}
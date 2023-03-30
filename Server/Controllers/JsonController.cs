using Microsoft.AspNetCore.Mvc;
using react_weatherapp.Models;
using System.Data;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace react_weatherapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetJsonController : ControllerBase
    {
        private readonly string _filePath = "./Server/JSONdata/cityList.json";

        [HttpGet]
        public JsonResult GetJsonData()
        {
            
            // Read the JSON file into a string
            string jsonString = System.IO.File.ReadAllText(_filePath);

            // Deserialize the JSON string to a list of objects
            var jsonData = JsonConvert.DeserializeObject<List<CityData>>(jsonString);

            // Return the JSON data as an HTTP response
            return new JsonResult(jsonData);
        }
    }
}
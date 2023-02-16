namespace react_weatherapp.Helpers
{

    public class Connection
    { 
        public string? connectionstring {
            get; set;
        }
        public Connection(IConfiguration _configuration)
        {

            var password = _configuration["ConnString:Password"];
            var user = _configuration["ConnString:User"];
            var source = _configuration["ConnString:Source"];
            var catalog = _configuration["ConnString:Catalog"];

            this.connectionstring = "Data Source=tcp:"+source+",1433;Initial Catalog="+catalog+";User Id="+user+"@react-weatherapp;Password="+password+"";
        }

    }
}

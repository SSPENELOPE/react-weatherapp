namespace react_weatherapp.Helpers
{

    public class Connection
    { 
        public string? connectionstring {
            get; set;
        }
        public Connection(IConfiguration _configuration)
        {

            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").AddUserSecrets<Program>().Build();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            this.connectionstring = connectionString;
        }

    }
}

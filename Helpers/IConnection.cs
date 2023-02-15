using System.Data.SqlClient;

namespace react_weatherapp {
    public interface IConnection 
    {
         public SqlConnectionStringBuilder CreateConnection();
    }
}
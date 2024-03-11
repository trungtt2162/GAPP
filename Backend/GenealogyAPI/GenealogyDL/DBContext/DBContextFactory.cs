using GenealogyDL.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.DBContext
{
    public class DBContextFactory : IDBContextFactory
    {
        public IDBContext CreateDatabaseContext(string connectionString)
        {
            var context = new DBContext(new MySqlConnection(connectionString));
            return context;
        }
    }
}

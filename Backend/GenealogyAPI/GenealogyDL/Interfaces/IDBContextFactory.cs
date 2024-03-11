using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IDBContextFactory
    {
        IDBContext CreateDatabaseContext(string connectionString);
    }
}

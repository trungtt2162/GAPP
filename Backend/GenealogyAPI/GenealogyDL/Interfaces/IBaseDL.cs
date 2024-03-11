using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IBaseDL<T> where T : class
    {
        void InitializeDatabaseContext(string connectionString);

        Task<T> GetById(object id);

    }
}

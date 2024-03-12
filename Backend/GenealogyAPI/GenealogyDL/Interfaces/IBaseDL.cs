using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IBaseDL<T> where T : class
    {
        void InitializeDatabaseContext(string connectionString);

        Task<T> GetById(object id);

        Task<int> ExecuteAsync(string commandText, object param = null);

        string GetFileSql(string namne);

        Task<P> QueryFirstOrDefaultAsync<P>(string procName, object param = null, CommandType commandType = CommandType.StoredProcedure);

        Task<P> ExecuteScalarAsync<P>(string commandText, object param = null);

    }
}

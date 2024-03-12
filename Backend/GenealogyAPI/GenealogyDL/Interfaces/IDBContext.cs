using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IDBContext : IDisposable
    {
        IDbConnection _dbConnection { get; set; }
        MySqlCommand _sqlCommand { get; }


        MySqlParameterCollection GetParamFromStore(string commandText);


        IDataReader ExecuteReader(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);


        Task<IDataReader> ExecuteReaderAsync(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);


        int Execute(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);

        Task<int> ExecuteAsync(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);


        object ExecuteScalar(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);


        Task<T> ExecuteScalarAsync<T>(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null);
        Task<IEnumerable<T>> Query<T>(string procText, object param = null, CommandType commandType = CommandType.StoredProcedure);

        Task<T> QueryFirstOrDefaultAsync<T>(string procName, object param = null, CommandType commandType = CommandType.StoredProcedure);

    }
}
using Dapper;
using GenealogyDL.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.DBContext
{
    internal class DBContext: IDBContext, IDisposable
    {
        #region Properties
        public IDbConnection _dbConnection { get; set; }
        public MySqlCommand _sqlCommand { get; set; }
        #endregion

        #region Constructors
        public DBContext(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _dbConnection.Open();
            _sqlCommand = (MySqlCommand)_dbConnection.CreateCommand();
        }

        public DBContext(string connectionString)
        {
            _dbConnection = new MySqlConnection(connectionString);
            _dbConnection.Open();
            _sqlCommand = (MySqlCommand)_dbConnection.CreateCommand();

        }

        public DBContext()
        {
            _dbConnection.Open();
            _sqlCommand = (MySqlCommand)_dbConnection.CreateCommand();

        }
        #endregion

        #region Methods

        public MySqlParameterCollection GetParamFromStore(string commandText)
        {
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlCommand.CommandText = commandText;
            MySqlCommandBuilder.DeriveParameters(_sqlCommand);
            return _sqlCommand.Parameters;
        }


        public IDataReader ExecuteReader(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            var reader = _dbConnection.ExecuteReader(commandText, param, transaction, commandTimeout, commandType);
            return reader;
        }


        public async Task<IDataReader> ExecuteReaderAsync(string commandText, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            return await _dbConnection.ExecuteReaderAsync(commandText, param, transaction, commandTimeout, commandType);
        }


        public int Execute(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = _dbConnection.Execute(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }


        public async Task<int> ExecuteAsync(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = await _dbConnection.ExecuteAsync(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }


        public object ExecuteScalar(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = _dbConnection.ExecuteScalar(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }

        public object QueryProc(string procText, object param = null, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = _dbConnection.Query<object>(procText, param, commandType: commandType);
                transac.Commit();
                return result;
            }
        }

        public async Task<object> ExecuteScalarAsync(string commandText, object param = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            using (var transac = _dbConnection.BeginTransaction())
            {
                var result = await _dbConnection.ExecuteScalarAsync(commandText, param, transac, commandTimeout, commandType);
                transac.Commit();
                return result;
            }
        }


        public void Dispose()
        {
            _dbConnection.Close();
            _dbConnection.Dispose();
        }

        #endregion
    }
}

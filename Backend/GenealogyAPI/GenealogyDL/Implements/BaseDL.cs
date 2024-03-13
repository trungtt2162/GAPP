using Dapper;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    public class BaseDL<T> : IBaseDL<T> where T : class
    {
        protected readonly IDBContextFactory _context;
        protected string _tableName;
        private readonly IWebHostEnvironment _env;
        private readonly IAuthService _authService;

        public BaseDL(IDBContextFactory dapperDatabaseContextFactory, IWebHostEnvironment env, IAuthService authService)
        {
            _context = dapperDatabaseContextFactory ;
            _tableName = Utilities.GetTableName<T>();
            _env = env;
            _authService = authService;
        }
        #region Properties

        protected string ConnectionString { get; set; }
        public string TableName { get => _tableName; }
        public async Task<T> GetById(object id)
        {
            string sql = $"SELECT * FROM {_tableName} WHERE  Id = @id;";
            var param = new Dictionary<string, object> (){
                ["@Id"] = id
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.QueryFirstOrDefaultAsync<T>(sql, param, commandType: System.Data.CommandType.Text);
            }
  
        }

        public async Task<bool> DeleteById(object id)
        {
            string sql = $"DELETE FROM {_tableName} WHERE  Id = @id;";
            var param = new Dictionary<string, object> (){
                ["@Id"] = id
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return (await dbContext.ExecuteAsync(sql, param)) > 0;
            }
  
        }

        public async Task<int> ExecuteAsync(string commandText, object param = null)
        {
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.ExecuteAsync(commandText, param);
            }
        }

        public async Task<P> ExecuteScalarAsync<P>(string commandText, object param = null)
        {
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.ExecuteScalarAsync<P>(commandText, param);
            }
        }

        public async Task<P> QueryFirstOrDefaultAsync<P>(string procName, object param = null, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.QueryFirstOrDefaultAsync<P>(procName, param, commandType);
            }
        }

        public string GetFileSql(string fileName)
        {
            return Utilities.GeFileContent(fileName, _env);
        }

        public void InitializeDatabaseContext(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public Dictionary<string, object> GetParamInsertDB<T>(T obj){
            var param = Utilities.CreateParamDB(obj);
            param["p_CreatedDate"] = DateTime.Now;
            param["p_CreatedBy"] = _authService.GetUserName();
            param["p_ModifiedBy"] = _authService.GetUserName();
            param["p_ModifiedDate"] = DateTime.Now;
            return param;
        }

        public Dictionary<string, object> GetParamUpdateDB<T>(T obj){
            var param = Utilities.CreateParamDB(obj);
            param["p_ModifiedBy"] = _authService.GetUserName();
            param["p_ModifiedDate"] = DateTime.Now;
            return param;
        }

        #endregion
    }
}

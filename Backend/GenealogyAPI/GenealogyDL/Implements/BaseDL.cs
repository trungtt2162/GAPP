using Dapper;
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

        public BaseDL(IDBContextFactory dapperDatabaseContextFactory, IWebHostEnvironment env)
        {
            _context = dapperDatabaseContextFactory ;
            _tableName = Utilities.GetEntityName<T>();
            _env = env ;
        }
        #region Properties

        protected string ConnectionString { get; set; }
        public string TableName { get => _tableName; }
        public async Task<T> GetById(object id)
        {
            var res = new List<T>();

            //s = (await GetEntitiesAsync($"SELECT * FROM {_tableName} WHERE  {_tableName}ID = @id;", new { id = id.ToString() })).AsList();

            if (res.Count > 0)
            {
                return res[0];
            }
            return null;
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

        #endregion
    }
}

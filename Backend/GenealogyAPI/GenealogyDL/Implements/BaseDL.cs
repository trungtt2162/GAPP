using Dapper;
using GenealogyCommon.Configuration;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    public class BaseDL<T> : IBaseDL<T> where T : class
    {
        protected readonly IDBContextFactory _context;
        protected string _tableName;
        private readonly IWebHostEnvironment _env;
        protected readonly IAuthService _authService;
        protected readonly IConfiguration _configuration;
        protected string _customView = null;
        public BaseDL(IDBContextFactory dapperDatabaseContextFactory, IWebHostEnvironment env, IAuthService authService)
        {
            _context = dapperDatabaseContextFactory ;
            _tableName = Utilities.GetTableName<T>();
            _env = env;
            _authService = authService;
            _configuration = ConfigService.GetConfiguration(env);
            ConnectionString = _configuration.GetValue<string>("ConnectionStrings:Genealogy_DB");
        }
        #region Properties

        protected string ConnectionString { get; set; }

        public async Task<int> Create(T obj){
            var proc = $"Proc_{_tableName}_Insert";
            var param = GetParamInsertDB(obj);
            return await this.QueryFirstOrDefaultAsync<int>(proc, param);
        }

        public async Task<bool> Update(T obj){
            var proc = $"Proc_{_tableName}_Update";
            var param = GetParamUpdateDB(obj);
            return (await this.QueryFirstOrDefaultAsync<int>(proc, param)) > 0;
        }

        public async Task<IEnumerable<T>> GetAll(object idGenealogy)
        {
            string sql = $"SELECT * FROM {_tableName} WHERE  IdGenealogy = @IdGenealogy;";
            var param = new Dictionary<string, object>()
            {
                ["@IdGenealogy"] = idGenealogy
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.Query<T>(sql, param, commandType: System.Data.CommandType.Text);
            }

        }

        public async Task<T> GetById(object id)
        {
            string sql = $"SELECT * FROM {_tableName} WHERE  Id = @Id;";
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
            string sql = $"DELETE FROM {_tableName} WHERE  Id = @Id;";
            var param = new Dictionary<string, object> (){
                ["@Id"] = id
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return (await dbContext.ExecuteAsync(sql, param)) > 0;
            }
  
        }

        public async Task<bool> DeleteById(object id, object idGenealogy)
        {
            string sql = $"DELETE FROM {_tableName} WHERE  Id = @Id and IdGenealogy = @IdGenealogy;";
            var param = new Dictionary<string, object>()
            {
                ["@Id"] = id,
                ["@IdGenealogy"] = idGenealogy

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

        public async Task<IEnumerable<P>> Query<P>(string procName, object param = null, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.Query<P>(procName, param, commandType);
            }
        }

        public string GetFileSql(string fileName)
        {
            return Utilities.GeFileContent(fileName, _env);
        }

        public Dictionary<string, object> GetParamInsertDB<T>(T obj){
            var param = Utilities.CreateParamDB(obj);
            param["p_CreatedDate"] = DateTime.Now;
            param["p_CreatedBy"] = _authService.GetFullName();
            param["p_ModifiedBy"] = _authService.GetFullName();
            param["p_ModifiedDate"] = DateTime.Now;
            return param;
        }

        public Dictionary<string, object> GetParamUpdateDB<T>(T obj){
            var param = Utilities.CreateParamDB(obj);
            param["p_ModifiedBy"] = _authService.GetFullName();
            param["p_ModifiedDate"] = DateTime.Now;
            PropertyInfo idProperty = typeof(T).GetProperty("Id");
            param["p_Id"] = idProperty.GetValue(obj);
            return param;
        }
        public async Task<PageResult<T>> GetPagingData(int pageSize, int pageNumber, string condition, string sortOrder)
        {
            if (string.IsNullOrWhiteSpace(condition)){
                condition = " 1 = 1 ";
            }
            if (string.IsNullOrWhiteSpace(sortOrder)){
                sortOrder = " ModifiedDate Desc ";
            }
            var sourceName = string.IsNullOrWhiteSpace(_customView) ? _tableName : _customView;
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                string sqlData = $@"SELECT * FROM {sourceName} WHERE {condition} ORDER BY {sortOrder} LIMIT @pageSize OFFSET  @offset";

                // get all
                if (pageNumber == -1)
                {
                    sqlData = $@"SELECT * FROM {sourceName} WHERE {condition} ORDER BY {sortOrder} ";
                }
                string sqlCount = $@"SELECT COUNT(*) FROM {sourceName} WHERE {condition}";
                var param = new
                {
                    offset = (pageNumber - 1) * pageSize,
                    pageSize
                };
                var results = await dbContext.QueryMultipleAsync<T, int>($"{sqlData};{sqlCount};", param, commandType: CommandType.Text);

                return new PageResult<T>
                {
                    Data = results.Item1.ToList(),
                    TotalCount = results.Item2.FirstOrDefault()
                };
                
            }
        }

        #endregion
    }
}

using Dapper;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    public class BaseDL<T> : IBaseDL<T> where T : class
    {
        protected readonly IDBContextFactory _context;
        protected string _tableName;

        public BaseDL(IDBContextFactory dapperDatabaseContextFactory)
        {
            _context = dapperDatabaseContextFactory ;
            _tableName = Utilities.GetEntityName<T>();
        }
        #region Properties

        protected string ConnectionString { get; set; }
        public string TableName { get => _tableName; }
        public async Task<T> GetById(object id)
        {
            var res = new List<T>();

            res = (await GetEntitiesAsync($"SELECT * FROM {_tableName} WHERE  {_tableName}ID = @id;", new { id = id.ToString() })).AsList();

            if (res.Count > 0)
            {
                return res[0];
            }
            return null;
        }
        public virtual async Task<IEnumerable<T>> GetEntitiesAsync(string commandText, object param = null)
        {
            using (var _dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                IDataReader sqlDataReader = await _dbContext.ExecuteReaderAsync(commandText, param);
                return ReadData(sqlDataReader);
            }
        }
        protected IEnumerable<T> ReadData(IDataReader sqlDataReader)
        {
            var res = new List<T>();
            while (sqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fieldType = sqlDataReader.GetDataTypeName(i);
                    var fieldName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = entity.GetType().GetProperty(fieldName);
                    if (fieldValue != System.DBNull.Value && property != null)
                    {
                        if (fieldType == "BIT")
                        {
                            if ((UInt64)fieldValue == 0) property.SetValue(entity, false);
                            else if ((UInt64)fieldValue == 1) property.SetValue(entity, true);
                            continue;
                        }

                        if ((property.PropertyType == typeof(Guid) || property.PropertyType == typeof(Guid?)) && fieldValue.GetType() == typeof(String))
                        {
                            property.SetValue(entity, Guid.Parse((string)fieldValue));
                        }
                        else
                        {
                            property.SetValue(entity, fieldValue);
                        }
                    }
                }
                res.Add(entity);
            }
            return res;
        }

        public void InitializeDatabaseContext(string connectionString)
        {
            ConnectionString = connectionString;
        }
        #endregion
    }
}

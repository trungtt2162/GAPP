using GenealogyCommon.Models;
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
        string GetFileSql(string namne);

        Task<int> ExecuteAsync(string commandText, object param = null);
        
        Task<P> QueryFirstOrDefaultAsync<P>(string procName, object param = null, CommandType commandType = CommandType.StoredProcedure);

        Task<P> ExecuteScalarAsync<P>(string commandText, object param = null);
        Task<IEnumerable<P>> Query<P>(string procName, object param = null, CommandType commandType = CommandType.StoredProcedure);

        Task<bool> UpdateViewNotification(string ids);

        #region  Data
        Task<T> GetById(object id);

        Task<IEnumerable<T>> GetAll(object idGenealogy);

        Task<int> Create(T obj);

        Task<bool> Update(T obj);

        Task<bool> DeleteById(object id);
        Task<bool> DeleteById(object id, object idGenealogy);


        Task<PageResult<T>> GetPagingData(int pageSize, int pageNumber, string condition, string sortOrder);
        #endregion

    }
}

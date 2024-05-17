using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IBaseBL<T> 
    {
        Task<T> GetById(object id);
        Task<IEnumerable<T>> GetAll(object idGenealogy);
        Task<object> Create(T obj);
        Task<bool> Update(T obj);
        Task<bool> DeleteByID(int Id);
        Task<bool> DeleteByID(int Id, int IdGenealogy);
        Task<PageResult<T>> GetPagingData(PageRequest pagingRequest);

        Task<bool> PushNotification(Notification notification);

        Task<bool> UpdateViewNotification(string ids);
    }
}

using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IEventBL: IBaseBL<Event>
    {
        Task<PageResult<Event>> GetPagingDataGuest(PageRequest pagingRequest, int idGenealogy);
    }
}

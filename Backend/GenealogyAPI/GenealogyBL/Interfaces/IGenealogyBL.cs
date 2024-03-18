using GenealogyBL.Implements;
using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IGenealogyBL: IBaseBL<Genealogy>
    {
        Task<PageResult<Genealogy>> GetPagingDataGuest(PageRequest pagingRequest);
    }
}

using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface ISuperAdminBL: IBaseBL<User>
    {

        Task<object> Create(User user, Genealogy genealogy);

    }
}

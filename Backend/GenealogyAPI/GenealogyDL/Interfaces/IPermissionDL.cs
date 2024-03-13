using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IPermissionDL: IBaseDL<Permission>
    {
        Task<bool> InsertPermission(Dictionary<string, object> param);
    }
}

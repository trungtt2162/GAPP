using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyDL.Implements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IUserDL: IBaseDL<User>
    {
        Task<bool> SaveCredential(Credential credential);
    }
}

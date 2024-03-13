using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Interfaces
{
    public interface IAuthService
    {
        string GetUserName();

        string GetRoleCode();
    } 
}
  
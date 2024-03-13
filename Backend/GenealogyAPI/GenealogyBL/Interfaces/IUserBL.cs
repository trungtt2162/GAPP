using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IUserBL: IBaseBL<User>
    {
        bool IsValidUserCredentials(string userName, string password);
        Task<string> GetUserRole(string userName);

        Task<User> GetUserInfo(string userName);

        Task<bool> CheckExistUser(string userName);

        Task<bool> SaveCredential(Credential credential);
    }
}

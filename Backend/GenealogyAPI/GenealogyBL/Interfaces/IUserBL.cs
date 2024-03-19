using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IUserBL: IBaseBL<User>
    {
        bool IsValidUserCredentials(string userName, string password);
        Task<bool> ChangePassword(ChangePassword obj);
        Task<string> GetUserRole(string userName);

        Task<bool> CheckExistUser(string userName);

        Task<bool> SaveCredential(Credential credential);

        Task<object> GetUserInfo();

        Task<Claim[]> GetClaims(string userName);

        Task<bool> CheckPermissionSubSystem(int userId, string subSystemcode, string permissionCode, int idGenealogy);

        Task<bool> RegisterGenealogy(int idGenealogy);
    }
}

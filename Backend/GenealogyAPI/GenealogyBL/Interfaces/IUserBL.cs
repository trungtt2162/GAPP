using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Models.Param;
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

        Task<bool> CheckPermissionSubSystem(string subSystemcode, string permissionCode, int idGenealogy);

        Task<bool> RegisterGenealogy(int idGenealogy);

        Task<object> GetAllPermission(int? idGenealogy = null);
        Task<object> GetRoles();
        Task<bool> AdminDecentralization(DecentralizationParam param);

        Task<bool>InsertUserRole(int userID, string roleCode, int idGenealogy);

        Task<bool> DeletePermission(DecentralizationParam param);

        Task<bool> RecoverPass(RecoverPass param);

        Task<bool> UpdateEmail(int userID, string email);
        Task<bool> CheckActionFamilytree(int idGenealogy, int idFamilyTree);
    }
}

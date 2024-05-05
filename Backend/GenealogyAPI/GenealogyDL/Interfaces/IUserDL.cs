using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Models.Param;
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
        Task<bool> UpdateCredential(Credential credential);

        Task<bool> CheckUserExist(string userName);

        Task<T> GetUserPassword<T>(string userName);

        Task<int> CreateAdmin(User user);
        Task<UserRole> GetUserRole(int userID);
        Task<User> GetUserByUserName(string userName);
        Task<List<UserRole>> GetAllUserByRole(string roleCode, int idGen);
        Task<bool> InsertUserRole(int userID, string roleCode, int IdGenealogy = -1);

        Task<bool> CheckPermissionSubSystem(int userId, string subSystemcode, string permissionCode, int idGenealogy);
        Task<PermissionClient> GetAllPermission(int? idGenealogy, int userID);
        Task<object> GetRoles();
        Task<bool> AdminDecentralization(DecentralizationParam param);

        Task<bool> DeletePermission(DecentralizationParam param);
        Task<bool> UpdateEmail(int userID, string email);
        Task<bool> DeleteAdmin(string userName);
        Task<bool> CheckActionFamilytree(int idGenealogy, int idFamilyTree, int idUserID);

    }
}

using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Models.Param;
using GenealogyCommon.Utils;
using GenealogyDL.DBContext;
using GenealogyDL.Interfaces;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Contracts;
using System.Drawing.Printing;
using System.Linq;
using System.Net;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using User = GenealogyCommon.Models.User;

namespace GenealogyDL.Implements
{
    public class UserDL : BaseDL<User>, IUserDL
    {
        public UserDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }
        #region Credential
        public async Task<bool> SaveCredential(Credential credential)
        {
            var sql = this.GetFileSql("insert_user_password.sql");
            var param = new Dictionary<string, object>()
            {
                ["UserName"] = credential.UserName,
                ["Password"] = credential.Password,
                ["CreatedBy"] = "admin",
                ["ModifiedBy"] = "admin",
                ["ModifiedDate"] = DateTime.Now,
                ["CreatedDate"] = DateTime.Now
            };
            return (await this.ExecuteAsync(sql, param)) > 0;
        }

        public async Task<bool> UpdateCredential(Credential credential)
        {
            var sql = this.GetFileSql("update_user_password.sql");
            var param = new Dictionary<string, object>()
            {
                ["UserName"] = credential.UserName,
                ["Password"] = credential.Password,
                ["ModifiedBy"] = _authService.GetFullName(),
            };
            return (await this.ExecuteAsync(sql, param)) > 0;
        }
        #endregion
        #region User
        public async Task<int> Create(User user)
        {
            var proc = "Proc_user_Insert";
            var param = Utilities.CreateParamDB(user);
            param["p_CreatedDate"] = DateTime.Now;
            return await this.QueryFirstOrDefaultAsync<int>(proc, param);
        }

        public async Task<UserRole> GetUserRole(int userID)
        {
            var sql = "select * from user_role where UserID = @userID";
            var param = new Dictionary<string, object>()
            {
                ["UserID"] = userID
            };
            var userRole = await this.QueryFirstOrDefaultAsync<UserRole>(sql, param, commandType: System.Data.CommandType.Text);
            return userRole;
        }

        public async Task<User> GetUserByUserName(string userName)
        {
            var sql = "select * from user where Email = @UserName";
            var param = new Dictionary<string, object>()
            {
                ["UserName"] = userName
            };
            var user = await this.QueryFirstOrDefaultAsync<User>(sql, param, commandType: System.Data.CommandType.Text);
            return user;

        }
        #endregion
        public async Task<bool> CheckUserExist(string userName)
        {
            var sql = "select UserName from user_password where UserName = @UserName";
            var param = new Dictionary<string, object>()
            {
                ["UserName"] = userName
            };
            var user = await this.ExecuteScalarAsync<object>(sql, param);
            if (user != null)
            {
                return true;
            }
            return false;

        }

        public async Task<T> GetUserPassword<T>(string userName)
        {
            var sql = "select * from user_password where UserName = @UserName";
            var param = new Dictionary<string, object>()
            {
                ["UserName"] = userName
            };
            var user = await this.QueryFirstOrDefaultAsync<T>(sql, param, commandType: System.Data.CommandType.Text);
            return user;

        }

        public async Task<List<UserRole>> GetAllUserByRole(string roleCode, int idGen){
            var sql = "select * from user_role where RoleCode = @RoleCode";
            var param = new Dictionary<string, object>()
            {
                ["RoleCode"] = roleCode
            };
            var users = await this.Query<UserRole>(sql, param, commandType: System.Data.CommandType.Text);
            if (users != null)
            {
                return users.ToList();
            }
            return new List<UserRole>();
        }

        public async Task<bool> InsertUserRole(int userID , string roleCode, int IdGenealogy = -1)
        {
            var sql = this.GetFileSql("insert_user_role.sql");
            var param = new Dictionary<string, object>()
            {
                ["RoleCode"] = roleCode,
                ["UserID"] = userID,
                ["IdGenealogy"] = IdGenealogy
            };
            return (await this.ExecuteAsync(sql, param)) > 0;
        }


        public async Task<bool> UpdateEmail(int userID, string email)
        {
            var sql = "UPDATE user u set u.Email = @Email WHERE u.Id = @UserID; ";
            var param = new Dictionary<string, object>()
            {
                ["Email"] = email,
                ["UserID"] = userID
            };
            return (await this.ExecuteAsync(sql, param)) > 0;
        }

        #region Supper Admin
        public async Task<int> CreateAdmin(User user)
        {
            var proc = "Proc_superadmin_insert_admin";
            var param = Utilities.CreateParamDB(user);
            param["p_CreatedDate"] = DateTime.Now;
            return await this.QueryFirstOrDefaultAsync<int>(proc, param);
        }


        #endregion

        #region Permission

        public async Task<bool> CheckPermissionSubSystem(int userId, string subSystemcode, string permissionCode, int idGenealogy)
        {
            var sql = "SELECT * FROM permission p WHERE p.UserID = @ID AND p.IdGenealogy  = @IDGenealogy and p.SubSystemCode = @SubSystemCode AND p.PermissionCode = @PermissionCode limit 1";
            var param = new Dictionary<string, object>()
            {
                ["ID"] = userId,
                ["IDGenealogy"] =  idGenealogy,
                ["SubSystemCode"] = subSystemcode,
                ["PermissionCode"] = permissionCode
            };
            var permission = await this.ExecuteScalarAsync<object>(sql, param);
            if (permission != null)
            {
                return true;
            }
            return false;
        }

        public async Task<PermissionClient> GetAllPermission(int? idGenealogy, int userID)
        {
            var param = new 
            {
                p_IDGenealogy = idGenealogy,
                p_UserID = userID
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                var results = await dbContext.QueryMultipleAsync<UserRoleClient, Permission>($"Proc_GetAllPermission", param, commandType: CommandType.StoredProcedure);
                return new PermissionClient()
                {
                    Roles = results.Item1.ToList(),
                    Permissions = results.Item2.ToList()
                };

            }
        }

        public async Task<object> GetRoles()
        {
            return await this.Query<object>("Proc_GetRoles", null, CommandType.StoredProcedure);
        }

        public async Task<bool> AdminDecentralization(DecentralizationParam param)
        {
            var param1 = new Dictionary<string, object>()
            {
                ["p_UserID"] = param.UserID,
                ["p_IDGenealogy"] = param.IdGenealogy,
                ["p_RoleCode"] = param.RoleCode,
                ["p_ModifiedBy"] = _authService.GetFullName()
            };
            var proc = "Proc_Admin_Decentralization";
            return (await this.QueryFirstOrDefaultAsync<int>(proc, param1)) > 0;
        }

        public async Task<bool> DeletePermission(DecentralizationParam param)
        {
            var param1 = new Dictionary<string, object>()
            {
                ["p_UserID"] = param.UserID,
                ["p_IDGenealogy"] = param.IdGenealogy,
                ["p_RoleCode"] = param.RoleCode
            };
            var proc = "Proc_Delete_Permission";
            return (await this.QueryFirstOrDefaultAsync<int>(proc, param1)) > 0;
        }


        #endregion

    }
}

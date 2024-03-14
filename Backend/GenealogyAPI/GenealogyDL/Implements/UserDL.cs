using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    public class UserDL : BaseDL<User>, IUserDL
    {
        public UserDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }

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
            var sql = "select * from user where UserName = @UserName";
            var param = new Dictionary<string, object>()
            {
                ["UserName"] = userName
            };
            var user = await this.ExecuteScalarAsync<User>(sql, param);
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

        public async Task<List<User>> GetAllUserByRole(string roleCode, int idGen){
            return new List<User>();
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

    }
}

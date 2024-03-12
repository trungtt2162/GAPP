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
        public UserDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env) : base(dbContextFactory, env)
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

        public async Task<int> Create(User user)
        {
            var proc = "Proc_user_Insert";
            var param = Utilities.CreateParamDB(user);
            param["p_CreatedDate"] = DateTime.Now;
            return await this.QueryFirstOrDefaultAsync<int>(proc, param);
        }

        public async Task<bool> CheckUserExist(string userName)
        {
            var sql = "select UserName from user where UserName = @UserName";
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
    }
}

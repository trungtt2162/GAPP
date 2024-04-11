using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    internal class UserGenealogyDL: BaseDL<UserGenealogy>, IUserGenealogyDL
    {
        public UserGenealogyDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }

        public async Task<bool> CheckUserExistInTree(int userId, int idGenealogy)
        {
            var sql = "select * FROM user_genealogy ug WHERE ug.IdGenealogy = @IdGenealogy AND ug.UserId = @UserId limit 1;";
            var param = new Dictionary<string, object>()
            {
                ["IdGenealogy"] = idGenealogy,
                ["UserId"] = userId
            };
            var user = await this.ExecuteScalarAsync<object>(sql, param);
            if (user != null)
            {
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<UserGenealogy>> GetUserGenealogies(int idFamilyTree, int idGenealogy)
        {
            string sql = $"select * FROM user_genealogy ug WHERE ug.IdGenealogy = @IdGenealogy AND ug.IdFamilyTree = @IdFamilyTree;";
            var param = new Dictionary<string, object>()
            {
                ["@IdGenealogy"] = idGenealogy,
                ["@IdFamilyTree"] = idFamilyTree
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.Query<UserGenealogy>(sql, param, commandType: System.Data.CommandType.Text);
            }
        }

        public async Task<int> InsertUserRegister(UserGenealogy user)
        {
            var proc = $"Proc_Insert_User_Register";
            var param = GetParamInsertDB(user);
            return await this.QueryFirstOrDefaultAsync<int>(proc, param);
        }

        public async Task<IEnumerable<UserGenealogy>> GetAll(object idGenealogy)
        {
            string sql = $"SELECT * FROM {_tableName} WHERE  IdGenealogy = @IdGenealogy and IdFamilyTree is not null and (InActive = false or InActive is null);";
            var param = new Dictionary<string, object>()
            {
                ["@IdGenealogy"] = idGenealogy
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.Query<UserGenealogy>(sql, param, commandType: System.Data.CommandType.Text);
            }

        }

        public async Task<bool> ResetUserGenealogy(int idFamilyTree, int idGenealogy)
        {
            string sql = $"UPDATE user_genealogy ug set ug.IdFamilyTree = NULL WHERE ug.IdFamilyTree = @IdFamilyTree AND ug.IdGenealogy = @IdGenealogy;";
            var param = new Dictionary<string, object>()
            {
                ["@IdGenealogy"] = idGenealogy,
                ["@IdFamilyTree"] = idFamilyTree
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return (await dbContext.ExecuteAsync(sql, param, commandType: System.Data.CommandType.Text)) > 0;
            }
        }

        public async Task<IEnumerable<UserGenealogy>> GetAllByUserID(int userID)
        {
            var sql = "select * FROM user_genealogy ug WHERE  ug.UserId = @UserId and InActive = false and IsBlock = false;";
            var param = new Dictionary<string, object>()
            {
                ["@UserId"] = userID,
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.Query<UserGenealogy>(sql, param, commandType: System.Data.CommandType.Text);
            }
        }

        public async Task<UserGenealogy> GetUserByUserID(int userId, int idGenealogy)
        {
            var sql = "select * FROM user_genealogy ug WHERE ug.IdGenealogy = @IdGenealogy AND ug.UserId = @UserId limit 1;";
            var param = new Dictionary<string, object>()
            {
                ["IdGenealogy"] = idGenealogy,
                ["UserId"] = userId
            };
            var users = await this.Query<UserGenealogy>(sql, param, commandType: System.Data.CommandType.Text);
            return users?.FirstOrDefault();
        }

        public async Task<bool> DeleteById(object id, object idGenealogy)
        {

            var param = new Dictionary<string, object>()
            {
                ["p_Id"] = id,
                ["p_IDGenealogy"] = idGenealogy
            };
            var proc = "Proc_user_genealogy_Delete";
            await this.QueryFirstOrDefaultAsync<int>(proc, param);
            return true;
        }


    }
}

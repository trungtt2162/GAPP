using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
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
    }
}

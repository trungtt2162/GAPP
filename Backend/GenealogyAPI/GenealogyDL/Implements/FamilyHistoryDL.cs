using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;

namespace GenealogyDL.Implements
{
    public class FamilyHistoryDL: BaseDL<FamilyHistory>, IFamilyHistoryDL
    {
        public FamilyHistoryDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }
        public async Task<FamilyHistory> GetByGenealogyId(object id)
        {
            string sql = $"SELECT * FROM {_tableName} WHERE  IdGenealogy = @id;";
            var param = new Dictionary<string, object>()
            {
                ["@Id"] = id
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return await dbContext.QueryFirstOrDefaultAsync<FamilyHistory>(sql, param, commandType: System.Data.CommandType.Text);
            }

        }
    }
}

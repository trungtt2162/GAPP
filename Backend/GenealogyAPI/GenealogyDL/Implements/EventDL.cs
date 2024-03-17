using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    internal class EventDL : BaseDL<Event>, IEventDL
    {
        public EventDL(IDBContextFactory dbContextFactory, IWebHostEnvironment env, IAuthService authService) : base(dbContextFactory, env, authService)
        {
        }

        public async Task<bool> DeleteById(object id)
        {
            string sql = $"DELETE FROM {_tableName} WHERE  Id = @Id;Delete From user_event where IdEvent = @Id;";
            var param = new Dictionary<string, object>()
            {
                ["@Id"] = id
            };
            using (var dbContext = _context.CreateDatabaseContext(ConnectionString))
            {
                return (await dbContext.ExecuteAsync(sql, param)) > 0;
            }

        }
    }
}

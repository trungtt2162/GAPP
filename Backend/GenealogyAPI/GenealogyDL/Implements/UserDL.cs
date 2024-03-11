using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyDL.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Implements
{
    public class UserDL : BaseDL<User>, IUserDL
    {
        public UserDL(IDBContextFactory dbContextFactory) : base(dbContextFactory)
        {
        }

        public Task<bool> SaveCredential(Credential credential)
        {
            
        }
    }
}

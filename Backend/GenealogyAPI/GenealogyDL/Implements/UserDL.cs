using GenealogyCommon.Models;
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

    }
}

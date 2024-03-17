using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class EventUserParam
    {
        public int IdGenealogy { get; set; }
        public int UserID { get; set; }

        public int IdEvent { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}

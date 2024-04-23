using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class UserParam
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Indentification { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfDeath { get; set; }
        public string Avatar { get; set; }
        public int Type { get; set; }
        public string HomeTown { get; set; }

    }
}

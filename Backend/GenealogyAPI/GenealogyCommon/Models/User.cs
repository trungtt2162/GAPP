using GenealogyCommon.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace GenealogyCommon.Models
{
    [Table("user")]
    public class User: BaseModel
    {
        public int IdGenealogy { get; set; }
        public int IdFamilyTree { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Indentification { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }

        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfDeath { get; set; }
        public string Avatar { get; set; }
        public int Type { get; set; }
        public string HomeTown { get; set; }

        public bool InActive { get; set; }
    }
}

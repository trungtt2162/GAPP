using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("user_genealogy")]
    public class UserGenealogy: User
    {
        public int IdFamilyTree {get; set;}

        public int IdGenealogy {get; set;}

        public int UserId { get; set; }
        public int TypeRole { get; set; }

        public string? Description { get; set; }

    }
    [Table("view_usergenealogy_role")]
    public class UserGenealogyView : UserGenealogy
    {
        public string RoleCode { get; set; }
        public string RoleName { get; set; }
    }
}

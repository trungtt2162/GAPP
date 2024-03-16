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
        public int IDFamilyTree {get; set;}

        public int IDGenealogy {get; set;}
    }
}

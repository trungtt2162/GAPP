using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("family_tree")]
    public class FamilyTree: BaseModel
    {
        public int IdGenealogy { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ParentID { get; set; }
    }
}

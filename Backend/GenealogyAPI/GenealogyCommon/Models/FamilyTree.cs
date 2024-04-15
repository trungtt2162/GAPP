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
        public int? ParentID { get; set; } = null;
    }

    public class FamilyTreeClient : BaseModel
    {
        public int IdGenealogy { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentID { get; set; } = null;

        public string? GenealogyName { get; set; }

        public List<UserGenealogy> Users { get; set; }  = new List<UserGenealogy> { };
    }

    public class FamilyTreeExport : FamilyTreeClient
    {
        public int Weight { get ; set; } = 0;

        public List<FamilyTreeExport> Children { get; set; } = new List<FamilyTreeExport> { };
    }
}

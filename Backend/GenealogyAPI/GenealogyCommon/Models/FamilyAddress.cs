using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("family_address")]
    public class FamilyAddress: BaseModel
    {

        public int IDGenealogy {get; set;}

        public string Name { get; set; }
        
        public string Location { get; set; }

        public int Type { get; set; }

        public string? Coordinate { get; set; }

    }
}

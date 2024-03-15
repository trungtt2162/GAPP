using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("genealogy")]
    public class Genealogy: BaseModel
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}

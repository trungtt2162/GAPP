using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        public bool IsPublic { get; set; } = false;

        public int UserId { get; set; }
    }
}

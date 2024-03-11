using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class BaseModel
    {
        [Column("modified_by")]
        public int ModifiedBy { get; set; }

        [Column("modified_date")]
        public int ModifiedDate { get; set; }

        [Column("created_by")]
        public int CreatedBy { get; set; }

        [Column("created_date")]
        public int CreatedDate { get; set; }
    }
}

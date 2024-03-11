using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class User: BaseModel
    {
        [Column("id")]
        public int Id { get; set; }
    }
}

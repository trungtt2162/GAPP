using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("log")]
    public class Log: BaseModel
    {

        public int IDGenealogy {get; set;}

        public string Action { get; set; }

        public DateTime? Date {get; set;}
        
        public string Description {get;set;}

        public string RawData { get; set; }
    }
}

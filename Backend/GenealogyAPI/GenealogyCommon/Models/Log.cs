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

        public string ActionName { get; set; }

        public int Action {get; set;}
        
        public string ActionRoleCode {get;set;}
    }
}

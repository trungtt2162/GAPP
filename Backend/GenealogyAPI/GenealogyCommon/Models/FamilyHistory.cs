using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("family_history")]
    public class FamilyHistory: BaseModel
    {

        public int IDGenealogy {get; set;}

        public string Image { get; set; }

        public string Description { get; set; }
        
    }

    [Table("family_history_detail")]
    public class FamilyHistoryDetail: FamilyHistory{
        public Datetime Date { get; set; }

        public int IDFamilyHistory {get; set;}

        public int Type { get; set; }
        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("fund")]
    public class Fund: BaseModel
    {
        public int IdGenealogy {get; set;}

        public long Money { get; set; }
        
        public string Name { get; set; }
        
        public string SpendPurpose { get; set; }
        
        public long EstimatedMoney { get; set; }
        
        
    }

    [Table("fund_contributor")]
    public class FundContributor: BaseModel{
        public int IdFund { get; set; }
        public int IdGenealogy {get; set;}
        public int IdUserGenealogy {get;set;}
        public int Money { get; set; }
        public Datetime PaymentDate {get; set;} 
    }

    [Table("fund_contributor")]
    public class FundSend: BaseModel {
        public int IdFund { get; set; }
        public int IdGenealogy {get; set;}
        public string Description {get; set;}
    }

    [Table("fund_feedback")]
    public class FundSend: BaseModel {
        public int IdFund { get; set; }
        public int IdGenealogy {get; set;}
        public int Type {get; set;}
        public string Name { get; set; }
        public string Title { get; set; }
    }
}

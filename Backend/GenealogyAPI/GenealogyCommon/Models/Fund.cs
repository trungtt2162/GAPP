using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public int UserID {get;set;}
        public int Money { get; set; }
        public DateTime PaymentDate {get; set;}

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
        public bool Confirmed { get; set; }
    }

    [Table("fund_send")]
    public class FundSend: BaseModel {
        public int IdFund { get; set; }
        public int IdGenealogy {get; set;}
        public string Description {get; set;}

        public long Money { get; set; }
    }

    [Table("fund_feedback")]
    public class FundFeedBack: BaseModel {
        public int IdFund { get; set; }
        public int IdGenealogy {get; set;}
        public int Type {get; set;}
        public string Name { get; set; }
        public string Title { get; set; }
    }
}

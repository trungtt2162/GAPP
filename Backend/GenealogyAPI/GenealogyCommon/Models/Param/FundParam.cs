using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class FundParam
    {
        [Required]
        public int IdGenealogy { get; set; }

        [Required]
        public long Money { get; set; }

        public string Name { get; set; }

        public string SpendPurpose { get; set; }

        public long EstimatedMoney { get; set; }

        public int Id { get; set; }
    }

    public class FundContributorParam
    {
        [Required]
        public int IdFund { get; set; }
        [Required]
        public int IdGenealogy { get; set; }
        [Required]
        public int UserID { get; set; }
        public int Money { get; set; }
        public DateTime PaymentDate { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public bool Confirmed { get; set; }

        public int Id { get; set; }
    }

    public class FundSendParam
    {
        public int IdFund { get; set; }
        public int IdGenealogy { get; set; }
        public string Description { get; set; }

        public int Id { get; set; }

        public long Money { get; set; }
    }
}

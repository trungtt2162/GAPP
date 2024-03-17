using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class FamilyHistoryParam
    {
        [Required]
        public int IDGenealogy { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public int Id { get; set; }
    }

    public class FamilyHistoryDetailParam: FamilyHistoryParam
    {
        public DateTime Date { get; set; }

        public int IdFamilyHistory { get; set; }

        public int Type { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class EventParam
    {
        [Required]
        public int IdGenealogy { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string LinkStream { get; set; }

        public int Type { get; set; }

        public string Background { get; set; }

        public DateTime OrganizationDate { get; set; }

        public string Location { get; set; }

        public int UserIDHost { get; set; }
    }
}

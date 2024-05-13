using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class FamilyAddressParam
    {
        [Required]
        public int IDGenealogy { get; set; }

        [Required]
        public string Name { get; set; }

        public string Location { get; set; }

        public int Type { get; set; }

        public int Id { get; set; }

        public string? Coordinate { get; set; }
    }
}

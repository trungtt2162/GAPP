using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class UserGenealogyParam
    {

        [Required]
        public int UserID { get; set; }

        [Required]
        public int IdFamilyTree { get; set; }

        [Required]
        public int IdGenealogy { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class EventUserParam
    {
        [Required]
        public int IdGenealogy { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public int IdEvent { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public int Id { get; set; }
    }
}

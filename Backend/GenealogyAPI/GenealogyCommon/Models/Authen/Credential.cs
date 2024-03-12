using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Authen
{
    [Table("user_password")]
    public class Credential: BaseModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}

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
        [Column("user_name")]
        public string Username { get; set; }

        [Column("password")]
        public string Password { get; set; }
    }
}

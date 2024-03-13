using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class UserRole: BaseModel
    {
        public string RoleCode { get; set; }
        public string RoleName { get; set; }
        public int UserID { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("permission")]
    public class Permission: BaseModel
    {
        public int IdGenealogy { get; set; }
        public string RoleCode { get; set; }
        public string RoleName { get; set; }
        public string SubSystemCode { get; set; }
        public string SubSystemName { get; set; }
        public string PermissionCode { get; set; }
        public string PermissionName { get; set; }

        public int UserID { get; set; }
    }

    public class PermissionClient
    {
        public List<Permission> Permissions { get; set; }

        public List<UserRoleClient> Roles { get; set; }
    }
}

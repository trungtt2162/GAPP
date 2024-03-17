using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Authen
{
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class ChangePassword: LoginRequest
    {
        [Required]
        public string PasswordNew { get; set; } = string.Empty;

    }
}

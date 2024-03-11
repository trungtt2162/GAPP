using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Authen
{
    public class ImpersonationRequest
    {
        [JsonPropertyName("username")] public string UserName { get; set; } = string.Empty;
    }
}

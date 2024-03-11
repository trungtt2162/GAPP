using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Authen
{
    public class LoginResult
    {
        [JsonPropertyName("username")] public string UserName { get; set; } = string.Empty;

        [JsonPropertyName("role")] public string Role { get; set; } = string.Empty;

        [JsonPropertyName("originalUserName")] public string OriginalUserName { get; set; } = string.Empty;

        [JsonPropertyName("accessToken")] public string AccessToken { get; set; } = string.Empty;

        [JsonPropertyName("refreshToken")] public string RefreshToken { get; set; } = string.Empty;
    }
}

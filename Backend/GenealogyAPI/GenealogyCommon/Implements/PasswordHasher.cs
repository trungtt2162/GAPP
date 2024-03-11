using GenealogyCommon.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Implements
{
    public class PasswordHasher : IPasswordHasher
    {
        public async Task<string> HashPassword(string password)
        {
            var hashed = BCrypt.Net.BCrypt.HashPassword(password, GetRandomSalt());
            return BCrypt.Net.BCrypt.HashPassword(password, GetRandomSalt());
        }

        public async Task<bool> ValidateHashPassword(string raw, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(raw, hash);
        }
        private string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }
    }
}

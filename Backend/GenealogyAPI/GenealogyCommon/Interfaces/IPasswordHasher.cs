using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Interfaces
{
    public interface IPasswordHasher
    {
        Task<string> HashPassword(string password);

        Task<bool> ValidateHashPassword(string raw, string hash);

        string GenerateRandomPassword(int length);
    }
}

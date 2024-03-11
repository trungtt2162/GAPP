using GenealogyBL.Interfaces;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GenealogyBL.Implements
{
    internal class UserBL : BaseBL<User>, IUserBL
    {
        private readonly IUserDL _userDL;
        private readonly IPasswordHasher _passwordHasher;
        public UserBL(IUserDL userDL, IPasswordHasher passwordHasher, IWebHostEnvironment env) : base(env, userDL)
        {
            _userDL = userDL;
            var conn = _configuration.GetConnectionString("Genealogy_DB");
            _userDL.InitializeDatabaseContext(conn ?? "");
            _passwordHasher = passwordHasher;
        }
        private readonly Dictionary<string, string> _users = new()
        {
            { "test1", "password1" },
            { "test2", "password2" },
            { "admin", "securePassword" }
        };

        public bool IsValidUserCredentials(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                return false;
            }

            return _users.TryGetValue(userName, out var p) && p == password;
        }

        public bool IsAnExistingUser(string userName)
        {
            return _users.ContainsKey(userName);
        }

        public string GetUserRole(string userName)
        {
            if (!IsAnExistingUser(userName))
            {
                return string.Empty;
            }

            if (userName == "admin")
            {
                return UserRoles.Admin;
            }

            return UserRoles.BasicUser;
        }

        public Task<User> GetUserInfo(string userName)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CheckExistUser(string userName)
        {
            return false;
        }

        public Task<bool> Create(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveCredential(Credential credential)
        {
            credential.Password = await _passwordHasher.HashPassword(credential.Password);

        }
    }

    public static class UserRoles
    {
        public const string Admin = nameof(Admin);
        public const string BasicUser = nameof(BasicUser);
    }
}

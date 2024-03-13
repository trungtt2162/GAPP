using GenealogyBL.Interfaces;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net;

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

        public bool IsValidUserCredentials(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                return false;
            }
            var user = _userDL.GetUserPassword<Credential>(userName).Result;
            if (user == null)
            {
                return false;
            }
            return _passwordHasher.ValidateHashPassword(password, user.Password).Result;
        }

        public bool IsAnExistingUser(string userName)
        {
            return _userDL.CheckUserExist(userName).Result;
        }

        public string GetUserRole(string userName)
        {
            //if (!IsAnExistingUser(userName))
            //{
            //    return string.Empty;
            //}

            if (userName == "admin")
            {
                return UserRoles.Admin;
            }

            return UserRoles.Account;
        }

        public Task<User> GetUserInfo(string userName)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CheckExistUser(string userName)
        {
            return false;
        }

        public async Task<object> Create(User user)
        {
            var lastId =  await _userDL.Create(user);
            return null;
        }

        public async Task<bool> SaveCredential(Credential credential)
        {
            credential.Password = await _passwordHasher.HashPassword(credential.Password);
            return await _userDL.SaveCredential(credential);
        }
    }

    public static class UserRoles
    {
        public const string Guest = nameof(Guest);
        public const string Account = nameof(Account);
        public const string Admin = nameof(Admin);
        public const string SuperAdmin = nameof(SuperAdmin);
    }

    public static class Permission {
        
    }
}

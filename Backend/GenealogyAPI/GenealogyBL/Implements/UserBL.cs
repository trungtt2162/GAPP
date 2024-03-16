using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
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
        private readonly IPermissionDL _permissionDL;
        public UserBL(IPermissionDL permissionDL,IUserDL userDL, IPasswordHasher passwordHasher, IWebHostEnvironment env) : base(env, userDL)
        {
            _userDL = userDL;
            _permissionDL = permissionDL;
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


        public async Task<string> GetUserRole(string userName)
        {
            var user = await _userDL.GetUserByUserName(userName);
            var userRole = await _userDL.GetUserRole(user.Id);
            return userRole.RoleCode;
        }

        public Task<User> GetUserInfo(string userName)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CheckExistUser(string userName)
        {
            return _userDL.CheckUserExist(userName).Result;
        }

        public async Task<object> Create(User user)
        {
            var lastId =  await _userDL.Create(user);
            var param = new Dictionary<string, object>()
            {
                ["p_UserID"] = lastId,
                ["p_RoleCode"] = nameof(UserRoles.Account),
                ["P_IdGenealogy"] = -1,
                ["p_ModifiedBy"] = "system"
            };
            await _permissionDL.InsertPermission(param);
            await _userDL.InsertUserRole(lastId, nameof(UserRoles.Account));

           
            return null;
        }

        public async Task<bool> SaveCredential(Credential credential)
        {
            credential.Password = await _passwordHasher.HashPassword(credential.Password);
            return await _userDL.SaveCredential(credential);
        }
    }

}

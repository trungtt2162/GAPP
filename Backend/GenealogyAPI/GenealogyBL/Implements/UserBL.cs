﻿using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Models.Param;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Data;
using System.Net;
using System.Security.Claims;

namespace GenealogyBL.Implements
{
    internal class UserBL : BaseBL<GenealogyCommon.Models.User>, IUserBL
    {
        private readonly IUserDL _userDL;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPermissionDL _permissionDL;
        private readonly IMapper _mapper;
        private readonly IUserGenealogyDL _userGenealogyDL;
        public UserBL(IUserGenealogyDL userGenealogyDL, IMapper mapper, IAuthService authService,
            IPermissionDL permissionDL, IUserDL userDL,
            IPasswordHasher passwordHasher, IWebHostEnvironment env, ILogDL logDL) : base(env, userDL, logDL, authService)
        {
            _userDL = userDL;
            _permissionDL = permissionDL;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _userGenealogyDL = userGenealogyDL;
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

        public async Task<bool> CheckExistUser(string userName)
        {
            return _userDL.CheckUserExist(userName).Result;
        }

        public async Task<object> Create(GenealogyCommon.Models.User user)
        {
            var lastId =  await _userDL.Create(user);
            //var param = new Dictionary<string, object>()
            //{
            //    ["p_UserID"] = lastId,
            //    ["p_RoleCode"] = nameof(UserRoles.Account),
            //    ["P_IdGenealogy"] = -1,
            //    ["p_ModifiedBy"] = "system"
            //};
            //await _permissionDL.InsertPermission(param);
            await InsertUserRole(lastId, nameof(UserRoles.Account), -1);

           
            return lastId;
        }
        public async Task<bool> InsertUserRole(int userID, string roleCode, int idGenealogy)
        {
            await _userDL.InsertUserRole(userID,roleCode, idGenealogy);
            return true;
        }
        public async Task<bool> SaveCredential(Credential credential)
        {
            credential.Password = await _passwordHasher.HashPassword(credential.Password);
            return await _userDL.SaveCredential(credential);
        }

        public async Task<object> GetUserInfo()
        {
            var userid = int.Parse(_authService.GetUserID());
            var userRole = await GetAllPermission(null);
            var user = await _userDL.GetById(userid);
            var userGenealogy = await _userGenealogyDL.GetAllByUserID(userid);
            return new
            {
                User = user,
                UserRole = userRole,
                UserGenealogy = userGenealogy
            };
        }

        public async Task<Claim[]> GetClaims(string userName)
        {
            var user = await _userDL.GetUserByUserName(userName);
            var userRole = await _userDL.GetUserRole(user.Id);
            var claims = new[]
            {
                new Claim(ClaimTypes.Role, userRole.RoleCode),
                new Claim("UserName",userName),
                new Claim("UserID", user.Id.ToString()),
                new Claim("FullName", $"{user.FirstName} {user.LastName}"),
            };
            return claims;
        }

        public async Task<bool> ChangePassword(ChangePassword obj)
        {
            var userName = _authService.GetUserName();
            if (!obj.UserName.Equals(userName))
            {
                throw new ArgumentException("Invalid: userName");
            }
           
            var check = IsValidUserCredentials(obj.UserName, obj.Password);
            if (!check)
            {
                throw new ArgumentException("Invalid: user, password");
            }

            obj.Password = await _passwordHasher.HashPassword(obj.PasswordNew);
            return await _userDL.UpdateCredential(_mapper.Map<Credential>(obj));
        }
        public async Task<bool> RegisterGenealogy(int idGenealogy)
        {
            var userid = int.Parse(_authService.GetUserID());
            var check = await _userGenealogyDL.CheckUserExistInTree(userid, idGenealogy);
            if (check)
            {
                throw new ArgumentException("User exist in genealogy");
            }
            var user = await _userDL.GetById(userid);
            var userRegister = _mapper.Map<UserGenealogy>(user);
            userRegister.InActive = true;
            userRegister.IdFamilyTree = -1;
            userRegister.UserId = userid;
            userRegister.IdGenealogy = idGenealogy;

            await _userGenealogyDL.InsertUserRegister(userRegister);
            return true;

        }

        #region Permission

        public async Task<bool> CheckPermissionSubSystem( string subSystemcode, string permissionCode, int idGenealogy)
        {
            return await _userDL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), subSystemcode, permissionCode, idGenealogy);
        }

        public async Task<object> GetAllPermission(int? idGenealogy = null)
        {
            var permission = await _userDL.GetAllPermission(idGenealogy, int.Parse(_authService.GetUserID()));
            if (permission == null)
            {
                throw new ArgumentException("Không có quyền");
            }
            permission.Roles.ForEach(role =>
            {
                role.Permissions = permission.Permissions.Where(x => x.IdGenealogy == role.IdGenealogy).ToList();
            });
            return permission.Roles;
        }

        public Task<object> GetRoles()
        {
            return _userDL.GetRoles();
        }

        public async Task<bool> AdminDecentralization(DecentralizationParam param)
        {
            return await _userDL.AdminDecentralization(param);
        }

        public async Task<bool> DeletePermission(DecentralizationParam param)
        {
            return await _userDL.DeletePermission(param);
        }
        #endregion
    }

}

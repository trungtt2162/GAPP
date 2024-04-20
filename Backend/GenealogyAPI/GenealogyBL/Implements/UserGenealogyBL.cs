using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Implements;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class UserGenealogyBL: BaseBL<UserGenealogy>, IUserGenealogyBL
    {
        private readonly IUserGenealogyDL _userGenealogyDL;
        private readonly IUserBL _userBL;
        private readonly IMapper _mapper;
        private readonly IPermissionDL _permissionDL;
        private readonly IEmailSender _emailSender;
        private readonly IGenealogyDL _genealogyDL;
        private readonly IExportService _exportService;
        private string appUrl = string.Empty;

        public UserGenealogyBL(IExportService exportService, IGenealogyDL genealogyDL, IEmailSender emailSender, IPermissionDL permissionDL, IAuthService authService, IMapper mapper, IUserBL userBL, IUserGenealogyDL userGenealogyDL, IWebHostEnvironment env, ILogDL logDL) : base(env, userGenealogyDL, logDL, authService)
        {
            _userGenealogyDL = userGenealogyDL;
            _userBL = userBL;
            _mapper = mapper;
            _permissionDL = permissionDL;
            _emailSender = emailSender;
            _genealogyDL = genealogyDL;
            _exportService = exportService;
            appUrl = _configuration.GetSection("AppSettings")["APPURL"];
        }

        public async Task<object> Create(UserGenealogy userGenealogy)
        {
            var checkExist = await _userGenealogyDL.CheckUserExistInTree(userGenealogy.UserId, userGenealogy.IdGenealogy);
            if (checkExist)
            {
                throw new ArgumentException("User Exist in Tree");
            } 

            var user = await _userBL.GetById(userGenealogy.UserId);
            var userSave = _mapper.Map<UserGenealogy>(user);
            userSave.UserId = userGenealogy.UserId;
            userSave.IdFamilyTree = userGenealogy.IdFamilyTree;
            userSave.IdGenealogy = userGenealogy.IdGenealogy;

            // insert permission
            var param = new Dictionary<string, object>()
            {
                ["p_UserID"] = userSave.UserId,
                ["p_RoleCode"] = nameof(UserRoles.Account),
                ["P_IdGenealogy"] = userSave.IdGenealogy,
                ["p_ModifiedBy"] = _authService.GetFullName()
            };
            await _permissionDL.InsertPermission(param);
            _ = InsertLog(LogAction.CreateAdmin, userGenealogy);
            return await _userGenealogyDL.Create(userSave);
        }

        public async Task<IEnumerable<UserGenealogy>> GetUserGenealogyByFamilyTree(int idFamilyTree, int idGenealogy)
        {
            return await _userGenealogyDL.GetUserGenealogies(idFamilyTree, idGenealogy);
        }


        public async Task<object> ApproveRegister(UserGenealogy user)
        {
            var param = new Dictionary<string, object>()
            {
                ["p_UserID"] = user.UserId,
                ["p_RoleCode"] = nameof(UserRoles.Account),
                ["P_IdGenealogy"] = user.IdGenealogy,
                ["p_ModifiedBy"] = _authService.GetFullName()
            };
            await _permissionDL.InsertPermission(param);
            await _userBL.InsertUserRole(user.UserId, nameof(UserRoles.Account), user.IdGenealogy);
            var userGen = await _userGenealogyDL.GetUserByUserID(user.UserId, user.IdGenealogy);
            userGen.IdFamilyTree = user.IdFamilyTree;
            userGen.InActive = false;
            await _userGenealogyDL.Update(userGen);
            var recip = new JObject {
                                {
                                    "Email",
                                    user.Email
                                }, {
                                    "Name",
                                   user.FirstName
                                }
                                };
            await _emailSender.SendEmailAsync(new JArray() { recip}, "Đã phê duyệt", "Bạn đã được phê duyệt vào cây gia phả", "Bạn đã được phê duyệt vào cây gia phả");
            return null;
        }

        public async Task<object> ApproveNewMember(UserGenealogy user, UserRegister userRegister = null)
        {
            var param = new Dictionary<string, object>()
            {
                ["p_UserID"] = user.UserId,
                ["p_RoleCode"] = nameof(UserRoles.Account),
                ["P_IdGenealogy"] = user.IdGenealogy,
                ["p_ModifiedBy"] = _authService.GetFullName()
            };
            await _permissionDL.InsertPermission(param);
            await _userBL.InsertUserRole(user.UserId, nameof(UserRoles.Account), user.IdGenealogy);
            var userGen = await _userGenealogyDL.GetUserByUserID(user.UserId, user.IdGenealogy);
            userGen.IdFamilyTree = user.IdFamilyTree;
            userGen.InActive = false;
            await _userGenealogyDL.Update(userGen);
            var recip = new JObject {
                                {
                                    "Email",
                                    user.Email
                                }, {
                                    "Name",
                                   user.FirstName
                                }
                                };
            if (userRegister != null)
            {
                await _emailSender.SendEmailAsync(new JArray() { recip },
                "Tài login cây gia phả", $"<div>UserName: {userRegister.Username}</div> <div>password: {userRegister.Password}</div><div>LinkWeb:{appUrl}</div>",
                $"<div>UserName: {userRegister.Username}</div> <div>password: {userRegister.Password}</div><div>LinkWeb: {appUrl}</div>");
            }

            return null;
        }

        public async Task<bool> SendMailCreateAccount(UserGenealogy user, UserRegister userRegister = null)
        {
            var recip = new JObject {
                                {
                                    "Email",
                                    user.Email
                                }, {
                                    "Name",
                                   user.FirstName
                                }
                                };
            if (userRegister != null)
            {
                await _emailSender.SendEmailAsync(new JArray() { recip },
                "Tài login cây gia phả", $"<div>UserName: {userRegister.Username}</div> <div>password: {userRegister.Password}</div><div>LinkWeb:{appUrl}</div>",
                $"<div>UserName: {userRegister.Username}</div> <div>password: {userRegister.Password}</div><div>LinkWeb: {appUrl}</div>");
            }
            return true;
        }

        override
        public void GetCustomParamPaging(PageRequest pagingRequest)
        {
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                throw new ArgumentException("IDGenealogy is null");
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Email like '%{pagingRequest.SearchKey}%'";
            }

        }

        public async Task<IEnumerable<UserGenealogy>> GetAllByUserId(int userID)
        {
            return await _userGenealogyDL.GetAllByUserID(userID);
        }

        public async Task<string> ExportUser(int idGenealogy)
        {
            PageRequest paggingRequest = new PageRequest()
            {
                PageNumber = -1,
                PageSize = -1,
                SearchKey = "",
                SortOrder = "",
                Condition = $" IdGenealogy = {idGenealogy} and (InActive = false or InActive is null) and IsBlock = false"
            };
            var data = await this.GetPagingData( paggingRequest );
            var userGenealogies = data.Data;
            var gen = await _genealogyDL.GetById(idGenealogy);
            return _exportService.ExportUserGenealogy(userGenealogies, gen);
        }


    }
}

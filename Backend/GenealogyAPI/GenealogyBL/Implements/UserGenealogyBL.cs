using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
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
        private readonly IAuthService _authService;

        public UserGenealogyBL(IPermissionDL permissionDL, IAuthService authService, IMapper mapper, IUserBL userBL, IUserGenealogyDL userGenealogyDL, IWebHostEnvironment env) : base(env, userGenealogyDL)
        {
            _userGenealogyDL = userGenealogyDL;
            _userBL = userBL;
            _mapper = mapper;
            _permissionDL = permissionDL;
            _authService = authService;
        }

        public async Task<object> Create(UserGenealogy userGenealogy)
        {
            var check = await _userBL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), SubSystem.Genealogy, PermissionCode.Edit, userGenealogy.IdFamilyTree);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            var checkExist = await _userGenealogyDL.CheckUserExistInTree(userGenealogy.UserId, userGenealogy.IdGenealogy);
            if (!checkExist)
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
            return await _userGenealogyDL.Create(userSave);
        }

        public async Task<IEnumerable<UserGenealogy>> GetUserGenealogyByFamilyTree(int idFamilyTree, int idGenealogy)
        {
            return await _userGenealogyDL.GetUserGenealogies(idFamilyTree, idGenealogy);
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


    }
}

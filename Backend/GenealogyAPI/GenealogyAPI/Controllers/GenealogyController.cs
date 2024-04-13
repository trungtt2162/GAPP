using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GenealogyController : Controller
    {
        private readonly IGenealogyBL _genealogyBL;
        private readonly IMapper _mapper;
        private readonly IUserBL _userBL;
        private readonly IAuthService _authService;
        private readonly IUserGenealogyBL _userGenealogyBL;
        private readonly IFamilyHistoryBL _familyHistoryBL;
        private readonly IPermissionDL _permissionDL;
        public GenealogyController(IPermissionDL permissionDL, IFamilyHistoryBL familyHistoryBL, IUserGenealogyBL userGenealogyBL, IUserBL userBL, IGenealogyBL genealogyBL, IMapper mapper, IAuthService authService)
        {
            _genealogyBL = genealogyBL;
            _mapper = mapper;
            _userBL = userBL;
            _authService = authService;
            _userGenealogyBL = userGenealogyBL;
            _familyHistoryBL = familyHistoryBL; 
            _permissionDL = permissionDL;
        }

        [HttpPost("guest/paging")]
        [AllowAnonymous]
        public async Task<ServiceResult> GetPagingDataGuest(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _genealogyBL.GetPagingDataGuest(paggingRequest);
            return serviceResult;
        }

        [HttpPost("paging")]
        [Authorize]
        public async Task<ServiceResult> GetPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _genealogyBL.GetPagingDataGuest(paggingRequest);
            return serviceResult;
        }

        [HttpPut("")]
        public async Task<ServiceResult> Update(Genealogy param)
        {
            var serviceResult = new ServiceResult();
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Genealogy, PermissionCode.Update, param.Id);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            serviceResult.Data = await _genealogyBL.Update(param);
            return serviceResult;
        }

        [HttpPost]
        public async Task<ServiceResult> CreateGen(Genealogy param)
        {
            var serviceResult = new ServiceResult();
            param.UserId = int.Parse(_authService.GetUserID());
            int idGen = (int)await _genealogyBL.Create(param);
            var user = await _userBL.GetById(param.UserId);
            await _userBL.InsertUserRole(param.UserId, nameof(UserRoles.Admin), idGen);
            var userGenology = _mapper.Map<UserGenealogy>(user);
            userGenology.IdGenealogy = idGen;
            userGenology.UserId = param.UserId;
            userGenology.InActive = false;
            userGenology.IsBlock = false;
            var idUserGenealogy = await _userGenealogyBL.Create(userGenology);
            var historyFamily = new FamilyHistory()
            {

                IDGenealogy = idGen,
                Image = "",
                Description = ""
            };
            await _familyHistoryBL.Create(historyFamily);
            var param1 = new Dictionary<string, object>()
            {
                ["p_UserID"] = param.UserId,
                ["p_RoleCode"] = nameof(UserRoles.Admin),
                ["P_IdGenealogy"] = idGen,
                ["p_ModifiedBy"] = _authService.GetFullName()
            };
            await _permissionDL.InsertPermission(param1);
            return serviceResult;
        }
    }
}

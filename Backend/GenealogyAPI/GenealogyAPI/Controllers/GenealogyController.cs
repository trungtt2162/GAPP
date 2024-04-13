using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
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
        public GenealogyController(IUserBL userBL, IGenealogyBL genealogyBL, IMapper mapper, IAuthService authService)
        {
            _genealogyBL = genealogyBL;
            _mapper = mapper;
            _userBL = userBL;
            _authService = authService;
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
            int genealogy = (int)await _genealogyBL.Create(param);
            await _userBL.InsertUserRole(param.UserId, nameof(UserRoles.Admin), genealogy);
            return serviceResult;
        }
    }
}

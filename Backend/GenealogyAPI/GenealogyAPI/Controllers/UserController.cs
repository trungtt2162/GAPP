using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Param;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _userBL;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly ILogBL _logBL;
        private readonly IBaseBL<Notification> _notificationBL;
        public UserController(ILogBL logBL, IAuthService authService, IUserBL userBL, IMapper mapper, IBaseBL<Notification> notificationBL) { 
            _userBL = userBL;
            _mapper = mapper;
            _authService = authService;
            _logBL = logBL;
            _notificationBL = notificationBL;
        }
        [HttpGet]
        public async Task<ServiceResult> GetUserInfo()
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _userBL.GetUserInfo();
            return serviceResult;
        }

        [HttpGet("permission")]
        public async Task<ServiceResult> GetAllPermission([FromQuery]int? idGenealogy)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _userBL.GetAllPermission(idGenealogy);
            return serviceResult;
        }

        [HttpGet("roles")]
        public async Task<ServiceResult> GetRoles()
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _userBL.GetRoles();
            return serviceResult;
        }

        [HttpPost("decentralization")]
        public async Task<ServiceResult> AdminDecentralization([FromBody]DecentralizationParam param)
        {
            var serviceResult = new ServiceResult();
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.User, PermissionCode.Add, param.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            serviceResult.Data = await _userBL.AdminDecentralization(param);
            return serviceResult;
        }


        [HttpPut]
        public async Task<ActionResult<object>> UpdateUser(UserParam userParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _userBL.GetById(int.Parse(_authService.GetUserID()));
            var userUpdate = _mapper.Map<User>(userParam);
            userUpdate.Id = user.Id;
            userUpdate.Email = user.Email;
            userUpdate.InActive = user.InActive;
            userUpdate.IsBlock = user.IsBlock;
            await _userBL.Update(userUpdate);
            return serviceResult.OnSuccess("Updated");
        }

        //[HttpPut("admin")]
        //[Authorize(Roles = UserRoles.Admin)]
        //public async Task<ServiceResult> UpdateUserByAdmin(User userParam)
        //{
        //    var serviceResult = new ServiceResult();
        //    if (!ModelState.IsValid)
        //    {
        //        return serviceResult.OnBadRequest();
        //    }

        //    await _userBL.Update(userParam);
        //    return serviceResult.OnSuccess("Updated");
        //}

        [HttpPost("register")]

        public async Task<ServiceResult> RegisterGenealogy([FromQuery]int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid param");
            }
            await _userBL.RegisterGenealogy(idGenealogy);
            return serviceResult.OnSuccess("Success");
        }

        [HttpDelete("permission")]
        public async Task<ServiceResult> DeletePermission([FromBody] DecentralizationParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid param");
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.User, PermissionCode.Delete, param.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _userBL.DeletePermission(param);
            return serviceResult.OnSuccess("Success");
        }

        [HttpPost("log")]
        public async Task<ServiceResult> GetLogPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _logBL.GetPagingData(paggingRequest);
            return serviceResult;
        }
        [HttpGet("notification")]
        public async Task<ServiceResult> GetNotification()
        {
            var serviceResult = new ServiceResult();
            PageRequest paggingRequest = new PageRequest()
            {
                PageNumber = -1,
                PageSize = -1,
                SearchKey = "",
                SortOrder = " CreatedDate Desc ",
                Condition = $" ReceiveID = {int.Parse(_authService.GetUserID())}"
            };
            serviceResult.Data = await _notificationBL.GetPagingData(paggingRequest);
            return serviceResult;
        }
        [HttpPut("notification/view")]
        public async Task<ServiceResult> UpdateView([FromBody] string ids)
        {
            var serviceResult = new ServiceResult();
            await _notificationBL.UpdateViewNotification(ids);
            return serviceResult;
        }
    }
}

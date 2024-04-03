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
        public UserController(ILogBL logBL, IAuthService authService, IUserBL userBL, IMapper mapper) { 
            _userBL = userBL;
            _mapper = mapper;
            _authService = authService;
            _logBL = logBL;
        }
        [HttpGet]
        public async Task<ServiceResult> GetUserInfo()
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _userBL.GetUserInfo();
            return serviceResult;
        }

        [HttpPut]
        [Authorize(Roles = UserRoles.Account)]
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

        [HttpPut("admin")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ServiceResult> UpdateUserByAdmin(User userParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _userBL.Update(userParam);
            return serviceResult.OnSuccess("Updated");
        }

        [HttpPost("register")]
        [Authorize(Roles = UserRoles.Account)]
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

        [HttpPost("log")]
        public async Task<ServiceResult> GetLogPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _logBL.GetPagingData(paggingRequest);
            return serviceResult;
        }

    }
}

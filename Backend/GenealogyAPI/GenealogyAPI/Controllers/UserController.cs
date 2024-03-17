using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
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
        public UserController(IUserBL userBL) { 
            _userBL = userBL;
        }
        [HttpGet]
        public async Task<ServiceResult> GetUserInfo()
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _userBL.GetUserInfo();
            return serviceResult;
        }
    }
}

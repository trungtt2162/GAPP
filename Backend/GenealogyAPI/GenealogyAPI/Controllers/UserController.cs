using GenealogyBL.Interfaces;
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
        public async Task<object> Get(int id)
        {
            return await _userBL.GetById(id);
        }
    }
}

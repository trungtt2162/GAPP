using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.SuperAdmin)]
    public class SuperAdminController : ControllerBase
    {
        private readonly ISuperAdminBL _superAdminBL;
        private readonly IMapper _mapper;
        public SuperAdminController(ISuperAdminBL superAdminBL, IMapper mapper)
        {
            _superAdminBL = superAdminBL;
            _mapper = mapper;
        }

        [HttpPost("admin/paging")]
        public async Task<ActionResult<object>> InsertAdmin(PageRequest paggingRequest)
        {
            return await _superAdminBL.GetPagingData(paggingRequest);
        }
        
        [HttpPost("admin")]
        public async Task<ActionResult<object>> InsertAdmin(UserAdmin userAdmin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _superAdminBL.Create(_mapper.Map<User>(userAdmin), _mapper.Map<Genealogy>(userAdmin));

            return Ok("Created");
        }

        [HttpPut("admin")]
        public async Task<ActionResult<object>> UpdateAdmin(UserAdmin userAdmin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _superAdminBL.Update(_mapper.Map<User>(userAdmin));

            return Ok("Created");
        }

        [HttpDelete("admin/{id}")]
        public async Task<ActionResult<object>> UpdateAdmin([FromQuery] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _superAdminBL.DeleteByID(id);

            return Ok("Created");
        }
    }
}

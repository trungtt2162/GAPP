using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Param;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class FamilyTreeController : ControllerBase
    {
        private readonly IFamilyTreeBL _familyTreeBL;
        private readonly IMapper _mapper;
        public FamilyTreeController(IFamilyTreeBL familyTreeBL, IMapper mapper)
        {
            _familyTreeBL = familyTreeBL;
            _mapper = mapper;
        }

        //[HttpPost("paging")]
        //public async Task<ServiceResult> GetPagingData(PageRequest paggingRequest)
        //{
        //    return await _superAdminBL.GetPagingData(paggingRequest);
        //}

        [HttpPost("")]
        public async Task<ServiceResult> InsertFamilyTree(FamilyTreeParam familytreeParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _familyTreeBL.Create(_mapper.Map<FamilyTree>(familytreeParam));

            return serviceResult.OnSuccess("Created");
        }

        //[HttpPut("")]
        //public async Task<ActionResult<object>> UpdateAdmin(UserAdmin userAdmin)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }
        //    await _superAdminBL.Update(_mapper.Map<User>(userAdmin));

        //    return Ok("Created");
        //}

        //[HttpDelete("")]
        //public async Task<ActionResult<object>> UpdateAdmin([FromQuery] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }
        //    await _superAdminBL.DeleteByID(id);

        //    return Ok("Created");
        //}
    }
}

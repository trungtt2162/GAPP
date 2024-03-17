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

        [HttpGet("")]
        public async Task<ServiceResult> GetAll([FromQuery]int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data =  await _familyTreeBL.GetTrees(idGenealogy);
            return serviceResult;
        }

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

        [HttpPost("export")]
        public async Task<ServiceResult> ExportFamilyTree([FromQuery]int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            /await _familyTreeBL.Create(_mapper.Map<FamilyTree>(familytreeParam));

            return serviceResult.OnSuccess("Created");
        }

        [HttpPut("")]
        public async Task<ActionResult<object>> UpdateFamilyTree(FamilyTreeParam familytreeParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _familyTreeBL.Update(_mapper.Map<FamilyTree>(familytreeParam));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpDelete("")]
        public async Task<ActionResult<object>> DeleteFamilyTree([FromQuery] int id, [FromQuery]int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _familyTreeBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }
    }
}

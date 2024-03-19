using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Param;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class UserGenealogyController : ControllerBase
    {
        private readonly IUserGenealogyBL _userGenealogyBL;
        private readonly IMapper _mapper;
        public UserGenealogyController(IUserGenealogyBL userGenealogyBL, IMapper mapper)
        {
            _userGenealogyBL = userGenealogyBL;
            _mapper = mapper;
        }

        [HttpPost("paging")]
        public async Task<ServiceResult> GetPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _userGenealogyBL.GetPagingData(paggingRequest);
            return serviceResult;
        }

        [HttpGet("")]
        public async Task<ServiceResult> GetAllUserGenealogy([FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();

            serviceResult.Data = await _userGenealogyBL.GetAll(idGenealogy);

            return serviceResult;
        }

        [HttpPost("detail")]
        public async Task<ServiceResult> GetUserGenealogyByID([FromQuery] int id)
        {
            var serviceResult = new ServiceResult();

            serviceResult.Data = await _userGenealogyBL.GetById(id);

            return serviceResult;
        }

        [HttpPost("tree")]
        public async Task<ServiceResult> GetUserGenealogyByFamilyTree([FromQuery] int idFamilyTree, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();

            serviceResult.Data = await _userGenealogyBL.GetUserGenealogyByFamilyTree(idFamilyTree, idGenealogy);

            return serviceResult;
        }

        [HttpPost("")]
        public async Task<ServiceResult> InsertUserGenealogy(UserGenealogyParam userGenealogyParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _userGenealogyBL.Create(_mapper.Map<UserGenealogy>(userGenealogyParam));

            return serviceResult.OnSuccess("Created");
        }

        [HttpPost("approve")]
        public async Task<ServiceResult> Approve(UserGenealogyParam userGenealogyParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _userGenealogyBL.ApproveRegister(_mapper.Map<UserGenealogy>(userGenealogyParam));
            return serviceResult.OnSuccess("Approved");
        }


        [HttpDelete("")]
        public async Task<ActionResult<object>> DeleteUserGenealogy([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _userGenealogyBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }

    }
}

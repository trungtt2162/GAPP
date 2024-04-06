using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models.Param;
using GenealogyCommon.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using GenealogyDL.Interfaces;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FamilyHistoryController : Controller
    {
        private readonly IFamilyHistoryBL _familyHistoryBL;
        private readonly IBaseBL<FamilyHistoryDetail> _baseBL;
        private readonly IMapper _mapper;
        private readonly IGenealogyBL _genealogyBL;
        private readonly IUserBL _userBL;
        public FamilyHistoryController(IUserBL userBL, IGenealogyBL genealogyBL, IBaseBL<FamilyHistoryDetail> baseBL,IFamilyHistoryBL familyHistoryBL, IMapper mapper)
        {
            _familyHistoryBL = familyHistoryBL;
            _mapper = mapper;
            _baseBL = baseBL;
            _genealogyBL = genealogyBL;
            _userBL = userBL;
        }

        [HttpGet("")]
        public async Task<ActionResult<object>> GetFamilyHistory([FromQuery]int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            serviceResult.Data = await _familyHistoryBL.GetByGenealogyId(idGenealogy);

            return serviceResult;
        }

        [HttpGet("guest")]
        [AllowAnonymous]
        public async Task<ActionResult<object>> GetFamilyHistoryGuest([FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var gen = await _genealogyBL.GetById(idGenealogy);
            if (gen == null || !gen.IsPublic)
            {
                return serviceResult;
            }
            serviceResult.Data = await _familyHistoryBL.GetByGenealogyId(idGenealogy);

            return serviceResult;
        }

        [HttpPut("")]
        public async Task<ActionResult<object>> UpdateFamilyHistoryDetail(FamilyHistoryParam familyHistoryParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.FamilyHistory, PermissionCode.Update, familyHistoryParam.IDGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _familyHistoryBL.Update(_mapper.Map<FamilyHistory>(familyHistoryParam));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpPost("detail/paging")]
        public async Task<ServiceResult> GetPagingData(PageRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                throw new ArgumentException("IDGenealogy is null");
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }
            serviceResult.Data = await _baseBL.GetPagingData(pagingRequest);
            return serviceResult;
        }


        [HttpPost("detail/guest/paging")]
        [AllowAnonymous]
        public async Task<ServiceResult> GetPagingDataGuest(PageRequest pagingRequest, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            var gen = await _genealogyBL.GetById(idGenealogy);
            if (gen == null || !gen.IsPublic)
            {
                return serviceResult;
            }
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                throw new ArgumentException("IDGenealogy is null");
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }
            serviceResult.Data = await _baseBL.GetPagingData(pagingRequest);
            return serviceResult;
        }

        [HttpGet("detail")]
        public async Task<ServiceResult> GetPagingData([FromQuery]int id, [FromQuery]int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _baseBL.GetById(id);
            return serviceResult;
        }
        [HttpPost("detail")]
        public async Task<ServiceResult> InsertFamilyHistoryDetail(FamilyHistoryDetailParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.FamilyHistory, PermissionCode.Add, param.IDGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _baseBL.Create(_mapper.Map<FamilyHistoryDetail>(param));

            return serviceResult.OnSuccess("Created");
        }

        [HttpPut("detail")]
        public async Task<ServiceResult> UpdateFamilyHistoryDetail(FamilyHistoryDetailParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.FamilyHistory, PermissionCode.Update, param.IDGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _baseBL.Update(_mapper.Map<FamilyHistoryDetail>(param));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpDelete("detail")]
        public async Task<ServiceResult> DeleteFamilyHistoryDetail([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.FamilyHistory, PermissionCode.Delete, idGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _baseBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }
    }
}

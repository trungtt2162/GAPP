using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Models.Param;
using GenealogyCommon.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FundController : ControllerBase
    {
        private readonly IFundBL _fundBL;
        private readonly IBaseBL<FundContributor> _contributorBL;
        private readonly IBaseBL<FundSend> _fundSendBL;
        private readonly IMapper _mapper;
        public FundController(IBaseBL<FundContributor> contributorBL, IBaseBL<FundSend> fundSendBL, IFundBL fundBL, IMapper mapper)
        {
            _fundBL = fundBL;
            _mapper = mapper;
            _contributorBL = contributorBL;
            _fundSendBL = fundSendBL;
        }

        [HttpGet("")]
        public async Task<ActionResult<object>> GetFundByID([FromQuery] int idFund)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            serviceResult.Data = await _fundBL.GetById(idFund);

            return serviceResult;
        }

        [HttpPost("")]
        public async Task<ServiceResult> InsertFund(FundParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _fundBL.Create(_mapper.Map<Fund>(param));

            return serviceResult.OnSuccess("Created");
        }

        [HttpDelete("")]
        public async Task<ServiceResult> DeleteEvent([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _fundBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }

        [HttpPost("paging")]
        public async Task<ServiceResult> GetPagingFund(PageRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _fundBL.GetPagingData(pagingRequest);
            return serviceResult;
        }

        [HttpPut("")]
        public async Task<ServiceResult> UpdateFund(FundParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _fundBL.Update(_mapper.Map<Fund>(param));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpGet("contributor")]
        public async Task<ActionResult<object>> GetFundContributorByID([FromQuery] int idFund)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            serviceResult.Data = await _contributorBL.GetById(idFund);

            return serviceResult;
        }

        [HttpPost("contributor")]
        public async Task<ServiceResult> InsertFundContributor(FundContributorParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _contributorBL.Create(_mapper.Map<FundContributor>(param));
            await _fundBL.UpdateMoneyFund(param.IdFund, param.IdGenealogy);

            return serviceResult.OnSuccess("Created");
        }

        [HttpDelete("contributor")]
        public async Task<ServiceResult> DeleteContributor([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _contributorBL.DeleteByID(id, idGenealogy);
            await _fundBL.UpdateMoneyFund(id, idGenealogy);
            return serviceResult.OnSuccess("Deleted");
        }

        [HttpPost("contributor/paging")]
        public async Task<ServiceResult> GetPagingFundContributor(PageRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _contributorBL.GetPagingData(pagingRequest);
            return serviceResult;
        }

        [HttpPut("contributor")]
        public async Task<ServiceResult> UpdateFundContributor(FundContributorParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _contributorBL.Update(_mapper.Map<FundContributor>(param));
            await _fundBL.UpdateMoneyFund(param.IdFund, param.IdGenealogy);
            return serviceResult.OnSuccess("Updated");
        }

        [HttpGet("send")]
        public async Task<ActionResult<object>> GetFundSendByID([FromQuery] int idFund)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            serviceResult.Data = await _contributorBL.GetById(idFund);

            return serviceResult;
        }

        [HttpPost("send")]
        public async Task<ServiceResult> InsertFundsend(FundSendParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _fundSendBL.Create(_mapper.Map<FundSend>(param));
            await _fundBL.UpdateMoneyFund(param.IdFund, param.IdGenealogy);

            return serviceResult.OnSuccess("Created");
        }

        [HttpDelete("send")]
        public async Task<ServiceResult> DeleteSendFund([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _fundSendBL.DeleteByID(id, idGenealogy);
            await _fundBL.UpdateMoneyFund(id, idGenealogy);
            return serviceResult.OnSuccess("Deleted");
        }

        [HttpPost("send/paging")]
        public async Task<ServiceResult> GetPagingFundSend(PageRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _fundSendBL.GetPagingData(pagingRequest);
            return serviceResult;
        }

        [HttpPut("send")]
        public async Task<ServiceResult> UpdateFundSend(FundSendParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _fundSendBL.Update(_mapper.Map<FundSend>(param));
            await _fundBL.UpdateMoneyFund(param.IdFund, param.IdGenealogy);
            return serviceResult.OnSuccess("Updated");
        }
    }
}

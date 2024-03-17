using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Param;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FeedBackController : ControllerBase
    {
        private readonly IFeedbackBL _feedBackBL;
        private readonly IMapper _mapper;
        public FeedBackController(IFeedbackBL feedbackBL, IMapper mapper)
        {
            _feedBackBL = feedbackBL;
            _mapper = mapper;
        }


        [HttpPost("")]
        public async Task<ServiceResult> InsertFeedback(FeedBackParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _feedBackBL.Create(_mapper.Map<FeedBack>(param));

            return serviceResult.OnSuccess("Created");
        }

        [HttpDelete("")]
        public async Task<ServiceResult> DeleteFeedback([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _feedBackBL.DeleteByID(id, idGenealogy);
            return serviceResult.OnSuccess("Deleted");
        }

        [HttpPost("paging")]
        public async Task<ServiceResult> GetPagingFeedback(PageRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _feedBackBL.GetPagingData(pagingRequest);
            return serviceResult;
        }

        [HttpPut("")]
        public async Task<ServiceResult> UpdateFeedback(FeedBackParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _feedBackBL.Update(_mapper.Map<FeedBack>(param));
            return serviceResult.OnSuccess("Updated");
        }
    }
}

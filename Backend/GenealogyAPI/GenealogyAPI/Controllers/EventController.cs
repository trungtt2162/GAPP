using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models.Param;
using GenealogyCommon.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EventController : Controller
    {
        private readonly IEventBL _eventBL;
        private readonly IBaseBL<UserEvent> _baseBL;
        private readonly IMapper _mapper;
        public EventController(IBaseBL<UserEvent> baseBL, IEventBL eventBL, IMapper mapper)
        {
            _eventBL = eventBL;
            _mapper = mapper;
            _baseBL = baseBL;
        }

        [HttpGet("")]
        public async Task<ActionResult<object>> GetEventByID([FromQuery]int idEvent)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            serviceResult.Data = await _eventBL.GetById(idEvent);

            return serviceResult;
        }

        [HttpPost("")]
        public async Task<ServiceResult> InsertEvent(EventParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _eventBL.Create(_mapper.Map<Event>(param));

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
            await _eventBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }

        [HttpPost("paging")]
        public async Task<ServiceResult> GetPagingData(PageRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _eventBL.GetPagingData(pagingRequest);
            return serviceResult;
        }

        [HttpPut("")]
        public async Task<ServiceResult> UpdateEvent(Event param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _eventBL.Update(_mapper.Map<Event>(param));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpGet("user-event")]
        public async Task<ActionResult<object>> GetEventUserByID([FromQuery] int idUserEvent)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            serviceResult.Data = await _baseBL.GetById(idUserEvent);

            return serviceResult;
        }

        [HttpPost("user-event")]
        public async Task<ServiceResult> InsertEventUser(EventUserParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _baseBL.Create(_mapper.Map<UserEvent>(param));

            return serviceResult.OnSuccess("Created");
        }

        [HttpDelete("user-event")]
        public async Task<ServiceResult> DeleteEventUser([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _baseBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }

        [HttpPost("user-event/paging")]
        public async Task<ServiceResult> GetPagingDataDetail(PageRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _baseBL.GetPagingData(pagingRequest);
            return serviceResult;
        }

        [HttpPut("user-event")]
        public async Task<ServiceResult> UpdateEventUser(EventUserParam param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _baseBL.Update(_mapper.Map<UserEvent>(param));

            return serviceResult.OnSuccess("Updated");
        }
    }
}

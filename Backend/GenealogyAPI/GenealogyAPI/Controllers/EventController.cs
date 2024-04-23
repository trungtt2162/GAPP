using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models.Param;
using GenealogyCommon.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using GenealogyDL.Implements;

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
        private readonly IUserBL _userBL;
        public EventController(IUserBL userBL, IBaseBL<UserEvent> baseBL, IEventBL eventBL, IMapper mapper)
        {
            _eventBL = eventBL;
            _mapper = mapper;
            _baseBL = baseBL;
            _userBL = userBL;
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

            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Event, PermissionCode.Add, param.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _eventBL.Create(_mapper.Map<Event>(param));

            return serviceResult.OnSuccess("Created");
        }

        [HttpPost("admin-request")]
        public async Task<ServiceResult> AdminRequestEvent(EventRequest param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            var eventData = _mapper.Map<Event>(param);
            var idEvent = await _eventBL.Create(eventData);
            if (param.UserEvents != null && param.UserEvents.Any())
            {
                List<Task> taskList = new List<Task>();
                param.UserEvents.ForEach(e =>
                {
                    e.IdEvent = (int)idEvent;
                    taskList.Add(_baseBL.Create(e));
                });
                await Task.WhenAll(taskList);
                await _eventBL.SendEmails(param.UserEvents);
            }

            return serviceResult.OnSuccess("Created");
        }


        [HttpPost("request-event")]
        public async Task<ServiceResult> RequestEvent(EventRequest param)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            var eventData = _mapper.Map<Event>(param);
            eventData.InActive = true;
            var idEvent = await _eventBL.Create(eventData);
            if (param.UserEvents != null && param.UserEvents.Any()) {
                List<Task> taskList = new List<Task>();
                param.UserEvents.ForEach(e =>
                {
                    e.IdEvent = (int)idEvent;
                    taskList.Add(_baseBL.Create(e));
                });
                await Task.WhenAll(taskList);
                //await _eventBL.SendEmails(param.UserEvents);
            }
           
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
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Event, PermissionCode.Delete, idGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
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

        [HttpPost("guest/paging")]
        [AllowAnonymous]
        public async Task<ServiceResult> GetPagingDataGuest(PageRequest pagingRequest, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _eventBL.GetPagingDataGuest(pagingRequest, idGenealogy);
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
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Event, PermissionCode.Update, param.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
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
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Event, PermissionCode.Add, param.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            var userEvent = _mapper.Map<UserEvent>(param);
            await _baseBL.Create(userEvent);
            await _eventBL.SendEmails(new List<UserEvent>() { userEvent });
            return serviceResult.OnSuccess("Created");
        }

        [HttpPost("users-event")]
        public async Task<ServiceResult> InsertEventUsers(List<EventUserParam> userEvents)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            if (userEvents == null || userEvents.Count == 0)
            {
                return serviceResult;
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Event, PermissionCode.Add, userEvents[0].IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            userEvents.ForEach(async (user) =>
            {
                var userEvent = _mapper.Map<UserEvent>(user);
                await _baseBL.Create(userEvent);
                await _eventBL.SendEmails(new List<UserEvent>() { userEvent });
            });

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
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Event, PermissionCode.Delete, idGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
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
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.Event, PermissionCode.Update, param.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _baseBL.Update(_mapper.Map<UserEvent>(param));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpGet("send-email")]
        public async Task<ServiceResult> SendEmaint([FromQuery]int idGenealogy, [FromQuery]int idEvent)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            var pagingRequest = new PageRequest();
            pagingRequest.PageNumber = -1;
            pagingRequest.Condition = $" IdGenealogy = {idGenealogy} and IdEvent = {idEvent}";
            pagingRequest.SortOrder = string.Empty;
            pagingRequest.SearchKey = string.Empty;

            var data = await _baseBL.GetPagingData(pagingRequest);
            var userEvent = data.Data;
            await _eventBL.SendEmails(userEvent);

            return serviceResult.OnSuccess("Done");
        }

    }
}

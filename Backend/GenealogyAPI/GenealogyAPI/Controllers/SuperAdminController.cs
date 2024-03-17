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
        public async Task<ServiceResult> GetPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data =  await _superAdminBL.GetPagingData(paggingRequest);
            return serviceResult;
        }
        
        [HttpPost("admin")]
        public async Task<ServiceResult> InsertAdmin(UserAdmin userAdmin)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _superAdminBL.Create(_mapper.Map<User>(userAdmin), _mapper.Map<Genealogy>(userAdmin));

            return serviceResult.OnSuccess("Created");
        }

        [HttpPut("admin")]
        public async Task<ServiceResult> UpdateAdmin(UserAdmin userAdmin)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _superAdminBL.Update(_mapper.Map<User>(userAdmin));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpDelete("admin")]
        public async Task<ServiceResult> UpdateAdmin([FromQuery] int id)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            await _superAdminBL.DeleteByID(id);

            return serviceResult.OnSuccess("Deteted");
        }
    }
}

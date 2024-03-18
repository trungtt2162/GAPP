using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenealogyController : Controller
    {
        private readonly IGenealogyBL _genealogyBL;
        private readonly IMapper _mapper;
        public GenealogyController(IGenealogyBL genealogyBL, IMapper mapper)
        {
            _genealogyBL = genealogyBL;
            _mapper = mapper;
        }

        [HttpPost("guest/paging")]
        [AllowAnonymous]
        public async Task<ServiceResult> GetPagingDataGuest(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _genealogyBL.GetPagingDataGuest(paggingRequest);
            return serviceResult;
        }

        [HttpPost("paging")]
        [Authorize]
        public async Task<ServiceResult> GetPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _genealogyBL.GetPagingDataGuest(paggingRequest);
            return serviceResult;
        }
    }
}

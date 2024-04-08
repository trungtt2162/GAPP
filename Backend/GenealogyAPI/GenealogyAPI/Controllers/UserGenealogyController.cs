using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Models.Param;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.Data;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UserGenealogyController : ControllerBase
    {
        private readonly IUserGenealogyBL _userGenealogyBL;
        private readonly IMapper _mapper;
        private readonly IUserBL _userBL;
        private readonly IBaseBL<UserGenealogyView> _view;
        public UserGenealogyController(IBaseBL<UserGenealogyView> view, IUserBL userBL, IUserGenealogyBL userGenealogyBL, IMapper mapper)
        {
            _userGenealogyBL = userGenealogyBL;
            _mapper = mapper;
            _userBL = userBL;
            _view = view;
        }

        [HttpPost("paging")]
        public async Task<ServiceResult> GetPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _view.GetPagingData(paggingRequest);
            return serviceResult;
        }

        [HttpGet("")]
        public async Task<ServiceResult> GetAllUserGenealogy([FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();

            serviceResult.Data = await _view.GetAll(idGenealogy);

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
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.UserGenealogy, PermissionCode.Add, userGenealogyParam.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
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
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.UserGenealogy, PermissionCode.Update, userGenealogyParam.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _userGenealogyBL.ApproveRegister(_mapper.Map<UserGenealogy>(userGenealogyParam));
            return serviceResult.OnSuccess("Approved");
        }

        [HttpPost("newmember")]
        public async Task<ServiceResult> AddNewMember(UserGenealogy userGenealogyParam)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.UserGenealogy, PermissionCode.Add, userGenealogyParam.IdGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            var userRegister = _mapper.Map<UserRegister>(userGenealogyParam);
            var isExist = await _userBL.CheckExistUser(userRegister.Username);
            if (isExist)
            {
                return serviceResult.OnBadRequest("Duplicate user");
            }
            // tạo user : fix cố định password
            userRegister.Password = "12345678";
            await _userBL.SaveCredential(_mapper.Map<Credential>(userRegister));
            var iduser = await _userBL.Create(_mapper.Map<User>(userRegister));
            userGenealogyParam.UserId = (int)iduser;
            await _userGenealogyBL.Create(userGenealogyParam);
            await _userGenealogyBL.ApproveRegister(_mapper.Map<UserGenealogy>(userGenealogyParam));
            return serviceResult.OnSuccess("Created");
        }



        [HttpDelete("")]
        public async Task<ActionResult<object>> DeleteUserGenealogy([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var check = await _userBL.CheckPermissionSubSystem(SubSystem.UserGenealogy, PermissionCode.Delete, idGenealogy);
            if (!check)
            {
                return serviceResult.OnUnauthorized("Không có quyền");
            }
            await _userGenealogyBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }

    }
}

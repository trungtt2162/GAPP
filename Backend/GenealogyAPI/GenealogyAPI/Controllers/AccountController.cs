using AutoMapper;
using GenealogyAPI.Infrastructure;
using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Cmp;
using System.Data;
using System.Security.Claims;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IUserBL _userBL;
        private readonly IMapper _mapper;
        private readonly TokenBlacklist _tokenBlacklist;
        public AccountController(IJwtAuthManager jwtAuthManager, IUserBL userBL, IMapper mapper, TokenBlacklist tokenBlacklist)
        {
            _jwtAuthManager = jwtAuthManager;
            _userBL = userBL;
            _mapper = mapper;
            _tokenBlacklist = tokenBlacklist;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ServiceResult> RegisterUser(UserRegister userRegister)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }
            var isExist = await _userBL.CheckExistUser(userRegister.Username);

            if (isExist)
            {
                return serviceResult.OnBadRequest("Duplicate user");
            }
            await _userBL.SaveCredential(_mapper.Map<Credential>(userRegister));
            await _userBL.Create(_mapper.Map<User>(userRegister));

            return serviceResult.OnSuccess("Created");
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ServiceResult> Login([FromBody] LoginRequest request)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest();
            }

            if (!_userBL.IsValidUserCredentials(request.UserName, request.Password))
            {
                return serviceResult.OnBadRequest();
            }

            var claims = await _userBL.GetClaims(request.UserName);

            var jwtResult = _jwtAuthManager.GenerateTokens(request.UserName, claims, DateTime.Now);
            serviceResult.Data = new LoginResult
            {
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString
            };
            return serviceResult;
        }

        [HttpPost("logout")]
        public ServiceResult Logout()
        {
            var userName = User.Identity?.Name!;
            _jwtAuthManager.RemoveRefreshTokenByUserName(userName);
            string token = HttpContext.Request.Headers["Authorization"];
            _tokenBlacklist.AddToken(token);
            return new ServiceResult();
        }

        [HttpPost("change-password")]
        public async Task<ServiceResult> ChangePassword(ChangePassword obj)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                serviceResult.OnBadRequest();
            }
            serviceResult.Success = await _userBL.ChangePassword(obj);
            return serviceResult;
        }


        [HttpPost("refresh-token")]
        public async Task<ServiceResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var serviceResult = new ServiceResult();
            try
            {
                var userName = User.Identity?.Name!;
                if (string.IsNullOrWhiteSpace(request.RefreshToken))
                {
                    return serviceResult.OnUnauthorized();
                }

                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
                var jwtResult = _jwtAuthManager.Refresh(request.RefreshToken, accessToken ?? string.Empty, DateTime.Now);
                serviceResult.Data = new LoginResult
                {
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken.TokenString
                };
            }
            catch (SecurityTokenException e)
            {
                return serviceResult.OnUnauthorized(e.Message);
            }
            return serviceResult;
        }

    }
}

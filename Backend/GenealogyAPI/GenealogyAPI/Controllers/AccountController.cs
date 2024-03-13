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
        public async Task<ActionResult<object>> RegisterUser(UserRegister userRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var isExist = await _userBL.CheckExistUser(userRegister.Username);

            if (isExist)
            {
                return BadRequest("Duplicate user");
            }
            await _userBL.SaveCredential(_mapper.Map<Credential>(userRegister));
            await _userBL.Create(_mapper.Map<User>(userRegister));

            return Ok("Created");
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (!_userBL.IsValidUserCredentials(request.UserName, request.Password))
            {
                return Unauthorized();
            }

            var role = await _userBL.GetUserRole(request.UserName);
            var claims = new[]
            {
            new Claim(ClaimTypes.Name,request.UserName),
            new Claim(ClaimTypes.Role, role)
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(request.UserName, claims, DateTime.Now);
            return Ok(new LoginResult
            {
                UserName = request.UserName,
                Role = role,
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString
            });
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            var userName = User.Identity?.Name!;
            _jwtAuthManager.RemoveRefreshTokenByUserName(userName);
            string token = HttpContext.Request.Headers["Authorization"];
            _tokenBlacklist.AddToken(token);
            return Ok("Logout success");
        }


        [HttpPost("refresh-token")]
        public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                var userName = User.Identity?.Name!;
                if (string.IsNullOrWhiteSpace(request.RefreshToken))
                {
                    return Unauthorized();
                }

                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
                var jwtResult = _jwtAuthManager.Refresh(request.RefreshToken, accessToken ?? string.Empty, DateTime.Now);
                return Ok(new LoginResult
                {
                    UserName = userName,
                    Role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty,
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken.TokenString
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message); 
            }
        }

    }
}

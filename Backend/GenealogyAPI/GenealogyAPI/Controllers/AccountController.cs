using GenealogyAPI.Infrastructure;
using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        public AccountController(IJwtAuthManager jwtAuthManager, IUserBL userBL)
        {
            _jwtAuthManager = jwtAuthManager;
            _userBL = userBL;
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
            await _userBL.SaveCredential(new Credential());
            await _userBL.Create(new User());
            var user = new User
            {
                Username = model.Username,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Password = await this._hasher.HashAsync(model.Password),
                Role = Role.USER
            };

            this._usersRepository.Create(user);

            return Ok("Created");
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (!_userBL.IsValidUserCredentials(request.UserName, request.Password))
            {
                return Unauthorized();
            }

            var role = _userBL.GetUserRole(request.UserName);
            var claims = new[]
            {
            new Claim(ClaimTypes.Name,request.UserName),
            new Claim(ClaimTypes.Role, role),
            new Claim("genealogy_id", "pnthuan")
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
            return Ok();
        }
    }
}

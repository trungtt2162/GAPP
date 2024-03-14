using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class FamilyTree : ControllerBase
    {
        
    }
}

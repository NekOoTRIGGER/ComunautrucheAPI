using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ComunautrucheAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new { message = "API C# OK" });
        }
    }
}

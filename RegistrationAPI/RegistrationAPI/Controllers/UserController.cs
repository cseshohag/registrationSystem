using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RegistrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;

        public UserController(IConfiguration config)
        {
            this._config = config;
        }

        [HttpPost("CreateUser")]
        public IActionResult Create()
        {
            return Ok("Success form create method!");
        }
    }
}

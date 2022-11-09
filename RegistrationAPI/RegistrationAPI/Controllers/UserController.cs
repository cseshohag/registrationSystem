using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RegistrationAPI.Models;

namespace RegistrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly UserContext _userContext;

        public UserController(IConfiguration config, UserContext userContext)
        {
            this._config = config;
            this._userContext = userContext;
        }

        [HttpPost("CreateUser")]
        public IActionResult Create(User user)
        {
            if(_userContext.Users.Where(u=> u.Email == user.Email).FirstOrDefault() != null)
            {
                return Ok("AlreadyExist");
            }
            user.CreatedDate = DateTime.Now;
            _userContext.Users.Add(user);
            _userContext.SaveChanges();
            return Ok("Success");
        }

        [HttpPost("LoginUser")]
        public IActionResult Login(Login loginUser)
        {
            var userAvailable = _userContext.Users.Where(x=>x.Email == loginUser.Email && x.Password == loginUser.Password).FirstOrDefault();
            if(userAvailable != null)
            {
                return Ok("Success");
            }
            return Ok("Failed");
        }
    }
}

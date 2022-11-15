using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public IActionResult Login(Login loginUser)
        {
            var userAvailable = _userContext.Users.Where(x=>x.Email == loginUser.Email && x.Password == loginUser.Password).FirstOrDefault();
            if(userAvailable != null)
            {
                return Ok(new JWTService(_config).GenerateToken(userAvailable));
            }
            return Ok("Failed");
        }

        [HttpGet]
        public IActionResult GetAllUser()
        {
            return Ok(_userContext.Users.ToList<User>());
        }


        [HttpGet("UserId")]
        public IActionResult GetUserById(int? _id)
        {
            return Ok(_userContext.Users.Where(x => x.UserID == _id).FirstOrDefault());
        }

        [HttpGet("UserEmail")]
        public IActionResult GetUserByEmail(string email)
        {
            var result = _userContext.Users.Where(x => x.Email == email).FirstOrDefault();
            if (result != null)
                return Ok(result);
            else
                return Ok("Email does not exists!");
        }

    }
}

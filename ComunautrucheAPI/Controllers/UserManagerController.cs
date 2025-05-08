using ComunautrucheAPI.DbContext;
using ComunautrucheAPI.Entities;
using ComunautrucheAPI.Manager;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComunautrucheAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly AutrucheDbContext _context;
        private IUserManager _userManager;

        public UserManagerController(AutrucheDbContext context, IUserManager userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        // Inscription (Register)
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var passwordhash = _userManager.HashPassword(request.Password);
            if (_context.Users.Any(u => u.Username == request.Email))
            {
                return BadRequest("Username already exists.");
            }

            var user = new User
            {
                Username = request.Email,
                Password = passwordhash,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully!" });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] RegisterRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Email);

            if (user == null)
            {
                return BadRequest("Mail or Password is wrong.");
            }

            if (!_userManager.VerifyPassword(request.Password, user.Password))
            {
                return BadRequest("Mail or Password is wrong.");
            }

            return Ok(new { Message = "User connected" });
        }
    }
}

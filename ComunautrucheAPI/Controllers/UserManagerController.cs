using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ComunautrucheAPI.DbContext;
using ComunautrucheAPI.Entities;
using ComunautrucheAPI.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ComunautrucheAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly AutrucheDbContext _context;
        private readonly IUserManager _userManager;
        public UserManagerController(AutrucheDbContext context, IUserManager userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        // Inscription (Register)
        [HttpPost("Register/{pseudo}")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request, string pseudo)
        {
            var passwordhash = _userManager.HashPassword(request.Password);
            if (_context.Users.Any(u => u.Email == request.Email))
            {
                return BadRequest("Username already exists.");
            }

            var user = new User
            {
                Email = request.Email,
                Password = passwordhash,
                Pseudo = pseudo
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully!" });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] RegisterRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("Mail or Password is wrong.");
            }

            if (!_userManager.VerifyPassword(request.Password, user.Password))
            {
                return BadRequest("Mail or Password is wrong.");
            }

            // Créer les claims
            string tokenString = _userManager.ClaimsGenerator(user);

            // Retourner aussi les infos de l'utilisateur
            return Ok(new { Token = tokenString, user });
        }

        [HttpGet("pseudo/{userId}")]
        public IActionResult GetPseudo(int userId)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
                return NotFound("Utilisateur non trouvé");

            return Ok(new { pseudo = user.Pseudo }); // renvoie JSON : { "pseudo": "..." }
        }

        [Authorize]
        [HttpGet("ProtectedRoute")]
        public IActionResult ProtectedRoute()
        {
            return Ok(new { Message = "You have access to this route" });
        }
    }
}

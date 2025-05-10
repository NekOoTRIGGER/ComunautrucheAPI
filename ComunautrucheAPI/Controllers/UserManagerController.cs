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
        private IUserManager _userManager;
        private JwtSettings _jwtSettings;
        public UserManagerController(AutrucheDbContext context, IUserManager userManager, JwtSettings jwtSettings)
        {
            _context = context;
            _userManager = userManager;
            _jwtSettings = jwtSettings;
        }


        // Inscription (Register)
        [HttpPost("Register/{pseudo}")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request, string pseudo)
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
                .FirstOrDefaultAsync(u => u.Username == request.Email);

            if (user == null)
            {
                return BadRequest("Mail or Password is wrong.");
            }

            if (!_userManager.VerifyPassword(request.Password, user.Password))
            {
                return BadRequest("Mail or Password is wrong.");
            }

            // Créer les claims
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),  // L'username ou autre information pertinente
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())  // Identifiant de l'utilisateur
    };

            // Générer une clé de sécurité
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));  // Utilisation de la clé du fichier de config
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Créer le token JWT
            var token = new JwtSecurityToken(
                issuer: "myapi",   // Ton émetteur (par exemple, ton nom de domaine)
                audience: "admin", // L'audience du token (ex. les utilisateurs qui peuvent le consommer)
                claims: claims,
                expires: DateTime.Now.AddMinutes(120), // Le token expire après 30 minutes
                signingCredentials: creds
            );

            // Retourner le token en réponse
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new { Token = tokenString });
        }
        [Authorize]
        [HttpGet("ProtectedRoute")]
        public IActionResult ProtectedRoute()
        {
            return Ok(new { Message = "You have access to this route" });
        }
    }
}

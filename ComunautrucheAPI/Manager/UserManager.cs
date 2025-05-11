using ComunautrucheAPI.Entities;
using Konscious.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ComunautrucheAPI.Manager
{
    public interface IUserManager
    {
        public string HashPassword(string password);
        public bool VerifyPassword(string password, string storedHash);
        public string ClaimsGenerator(User user);


    }

    public class UserManager: IUserManager
    {
        private readonly JwtSettings _jwtSettings;

        public UserManager(JwtSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
        }

        public string HashPassword(string password)
        {
            byte[] salt = new byte[16];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
            {
                Salt = salt,
                DegreeOfParallelism = 8,
                Iterations = 4,
                MemorySize = 1024 * 1024
            };

            byte[] hash = argon2.GetBytes(32);

            byte[] hashBytes = new byte[salt.Length + hash.Length];
            Buffer.BlockCopy(salt, 0, hashBytes, 0, salt.Length);
            Buffer.BlockCopy(hash, 0, hashBytes, salt.Length, hash.Length);

            return Convert.ToBase64String(hashBytes);
        }

        public bool VerifyPassword(string password, string storedHash)
        {
            byte[] hashBytes = Convert.FromBase64String(storedHash);

            byte[] salt = new byte[16];
            Buffer.BlockCopy(hashBytes, 0, salt, 0, salt.Length);

            var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
            {
                Salt = salt,
                DegreeOfParallelism = 8,
                Iterations = 4,
                MemorySize = 1024 * 1024
            };

            byte[] hash = argon2.GetBytes(32);

            for (int i = 0; i < hash.Length; i++)
            {
                if (hashBytes[i + salt.Length] != hash[i]) return false;
            }

            return true;
        }

        public string ClaimsGenerator(User user)
        {
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
            return tokenString;
        }

    }
}

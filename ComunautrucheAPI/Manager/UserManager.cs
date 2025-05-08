using Konscious.Security.Cryptography;
using System.Text;

namespace ComunautrucheAPI.Manager
{
    public interface IUserManager
    {
        public string HashPassword(string password);
        public bool VerifyPassword(string password, string storedHash);

    }

    public class UserManager: IUserManager
    {
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
    }
}

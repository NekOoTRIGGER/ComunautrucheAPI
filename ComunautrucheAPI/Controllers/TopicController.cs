using ComunautrucheAPI.DbContext;
using ComunautrucheAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComunautrucheAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly AutrucheDbContext _context;

        public TopicController(AutrucheDbContext context)
        {
            _context = context;
        }

        [HttpPost("user/{userId}/create")]
        public IActionResult Create(int userId)
        {
            //if (!User.Identity.IsAuthenticated)
            //{
            //    return Unauthorized("Utilisateur non authentifié");
            //}
            var user = _context.Users.Where(x => x.Id == userId).FirstOrDefault();
            if (user == null)
            {
                return NotFound("Utilisateur non trouvé");
            }
            
                Topic topic = new Topic()
                {
                    Title = "Chats",
                    Content = "Tout sur les chats",
                    CreatedAt = DateTime.Now,
                    UserId = userId,
                    User = user
                };
                _context.Topics.Add(topic);
                _context.SaveChanges();
            

            return Ok();
        }

        [Authorize]
        [HttpGet("getalltopics")]
        public List<Topic> GetAllTopics()        
        {
            return _context.Topics
                         .Include(t => t.Posts)
                         .Include(t => t.TopicTags)
                         .ToList();
        }
    }
}

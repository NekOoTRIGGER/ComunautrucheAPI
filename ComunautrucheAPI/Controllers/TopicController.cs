using System.Security.Claims;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public TopicController(AutrucheDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateTopic([FromBody] Topic topicDto)
        {
            var userId = int.Parse(User.FindFirst("id").Value); // ou selon ton système de claims

            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
            {
                return NotFound("Utilisateur non trouvé");
            }

            Topic topic = new()
            {
                Title = topicDto.Title,
                Content = topicDto.Content,
                CreatedAt = DateTime.Now,
                UserId = userId,
                User = user
            };

            _context.Topics.Add(topic);
            _context.SaveChanges();

            return Ok(topic); // ou CreatedAtAction si tu veux faire REST à fond
        }

        [Authorize]
        [HttpGet]
        public List<Topic> GetTopic()
        {
            return _context.Topics
                .Include(t => t.Posts)
                .Include(t => t.TopicTags)
                .ToList();
        }
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateTopic(int id, [FromBody] Topic topic)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var topicDA = _context.Topics.FirstOrDefault(x => x.Id == id);

            if (topicDA == null)
            {
                return NotFound();
            }

            // Mise à jour des champs manuellement (évite de remplacer l'objet entier)
            topicDA.Title = topic.Title;
            topicDA.Content = topic.Content;
            topicDA.CreatedAt = topic.CreatedAt;
            topicDA.UserId = userId;

            // Optionnel : gérer Posts et TopicTags si besoin (sinon ignorer pour éviter les conflits de tracking)
            // topic.Posts = topicDto.Posts;
            // topic.TopicTags = topicDto.TopicTags;

            _context.SaveChanges();

            return Ok(topicDA);
        }

        [Authorize]
        [HttpDelete("{id}")]
        ///topics/:id
        public IActionResult DeleteTopic(int id)
        {

            var topic = _context.Topics
                .Where(x => x.Id == id)
                .FirstOrDefault();

            if (topic == null)
            {
                return NotFound();
            }

            _context.Remove(topic);

            _context.SaveChanges();

            return Ok(); 
        }
        [Authorize]
        [HttpGet("{topicId}/posts")]
        public IActionResult GetPostsByTopic(int topicId)
        {
            var topic = _context.Topics
                .Include(t => t.Posts)
                    .ThenInclude(p => p.User)
                .Include(t => t.Posts)
                    .ThenInclude(p => p.Votes)
                .FirstOrDefault(t => t.Id == topicId);

            if (topic == null)
                return NotFound();

            return Ok(topic.Posts);
        }
    }
}

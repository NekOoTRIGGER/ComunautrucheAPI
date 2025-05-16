using System.Security.Claims;
using ComunautrucheAPI.DbContext;
using ComunautrucheAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComunautrucheAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AutrucheDbContext _context;

        public PostsController(AutrucheDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreatePost([FromBody] Post postDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return NotFound("Utilisateur non trouvé");

            var topic = _context.Topics.FirstOrDefault(t => t.Id == postDto.TopicId);
            if (topic == null)
                return NotFound("Topic non trouvé");

            var post = new Post
            {
                Content = postDto.Content,
                PostedAt = DateTime.Now,
                TopicId = topic.Id,
                UserId = userId,
                User = user
            };

            _context.Posts.Add(post);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetPostById), new { id = post.Id }, post);
        }

        [HttpGet]
        public IActionResult GetPosts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var posts = _context.Posts
                .Include(p => p.Votes)
                .Include(p => p.User)
                .Include(p => p.Topic)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = _context.Posts
                .Include(p => p.Votes)
                .Include(p => p.User)
                .Include(p => p.Topic)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
                return NotFound();

            return Ok(post);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePost(int id, [FromBody] Post postDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
                return NotFound();

            var userId = int.Parse(User.FindFirst("id").Value);
            if (post.UserId != userId)
                return Forbid("Vous ne pouvez modifier que vos propres posts.");

            post.Content = postDto.Content;
            post.PostedAt = DateTime.Now;

            _context.SaveChanges();

            return Ok(post);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
                return NotFound();

            var userId = int.Parse(User.FindFirst("id").Value);
            if (post.UserId != userId)
                return Forbid("Vous ne pouvez supprimer que vos propres posts.");

            _context.Posts.Remove(post);
            _context.SaveChanges();

            return NoContent(); // 204
        }
    }
}
using System.ComponentModel.DataAnnotations;

namespace ComunautrucheAPI.Entities;

public class Post
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime PostedAt { get; set; }
    [StringLength(30)]
    public string Title { get; set; }
    public int TopicId { get; set; }
    public Topic Topic { get; set; }
    public string Image {  get; set; }

    public int UserId { get; set; }
    public User User { get; set; }

    public ICollection<Vote> Votes { get; set; }
}


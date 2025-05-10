using System.ComponentModel.DataAnnotations;

namespace ComunautrucheAPI.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    [StringLength(30)]
    public string Pseudo { get; set; }

    public ICollection<Topic> Topics { get; set; }
    public ICollection<Post> Posts { get; set; }
    public ICollection<Vote> Votes { get; set; }
}


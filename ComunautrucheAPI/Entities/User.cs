using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ComunautrucheAPI.Entities;

public class User
{
    [Key]
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    [StringLength(30)]
    public string Pseudo { get; set; }
    public string Picture { get; set; }


    public ICollection<Topic> Topics { get; set; }
    public ICollection<Post> Posts { get; set; }
    public ICollection<Vote> Votes { get; set; }
}


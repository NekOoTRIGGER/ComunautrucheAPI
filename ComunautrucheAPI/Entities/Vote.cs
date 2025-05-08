namespace ComunautrucheAPI.Entities;

public class Vote
{
    public int Id { get; set; }
    public int Value { get; set; } // -1, 0, 1

    public int UserId { get; set; }
    public User User { get; set; }

    public int PostId { get; set; }
    public Post Post { get; set; }
}


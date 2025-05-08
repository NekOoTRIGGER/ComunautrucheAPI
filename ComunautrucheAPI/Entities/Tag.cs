namespace ComunautrucheAPI.Entities;

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<TopicTag> TopicTags { get; set; }
}


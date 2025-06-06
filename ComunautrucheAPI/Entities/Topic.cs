﻿namespace ComunautrucheAPI.Entities;

public class Topic
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Image { get; set; }


    public int UserId { get; set; }
    public User User { get; set; }

    public ICollection<Post> Posts { get; set; }
    public ICollection<TopicTag> TopicTags { get; set; }
}


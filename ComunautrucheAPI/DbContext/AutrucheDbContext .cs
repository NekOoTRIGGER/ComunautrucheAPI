namespace ComunautrucheAPI.DbContext;

using ComunautrucheAPI.Entities;
using Microsoft.EntityFrameworkCore;


public class AutrucheDbContext : DbContext
{
    public AutrucheDbContext(DbContextOptions<AutrucheDbContext> options)
    : base(options)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<TopicTag> TopicTags { get; set; }
    public DbSet<Vote> Votes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Many-to-many Topic <-> Tag
        modelBuilder.Entity<TopicTag>()
            .HasKey(tt => new { tt.TopicId, tt.TagId });

        modelBuilder.Entity<TopicTag>()
            .HasOne(tt => tt.Topic)
            .WithMany(t => t.TopicTags)
            .HasForeignKey(tt => tt.TopicId);

        modelBuilder.Entity<TopicTag>()
            .HasOne(tt => tt.Tag)
            .WithMany(t => t.TopicTags)
            .HasForeignKey(tt => tt.TagId);

        // Topic - User (1:N)
        modelBuilder.Entity<Topic>()
            .HasOne(t => t.User)
            .WithMany(u => u.Topics)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Post - User (1:N)
        modelBuilder.Entity<Post>()
            .HasOne(p => p.User)
            .WithMany(u => u.Posts)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Post - Topic (1:N)
        modelBuilder.Entity<Post>()
            .HasOne(p => p.Topic)
            .WithMany(t => t.Posts)
            .HasForeignKey(p => p.TopicId)
            .OnDelete(DeleteBehavior.Cascade);

        // Vote - User (1:N)
        modelBuilder.Entity<Vote>()
            .HasOne(v => v.User)
            .WithMany(u => u.Votes)
            .HasForeignKey(v => v.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Vote - Post (1:N)
        modelBuilder.Entity<Vote>()
            .HasOne(v => v.Post)
            .WithMany(p => p.Votes)
            .HasForeignKey(v => v.PostId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
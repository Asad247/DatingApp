
namespace API.Entities;

public class AppUser
{
    public string id { get; set; } = new Guid().ToString();
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
}

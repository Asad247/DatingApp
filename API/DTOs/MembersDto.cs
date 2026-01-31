using System;

namespace API.DTOs;

public class MembersDto
{
    public required string displayName { get; set; }
    public string imageUrl { get; set; } = string.Empty;
}

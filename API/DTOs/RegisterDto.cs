using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required] public string DisplayName { get; set; } = null!;
    [Required][EmailAddress] public string Email { get; set; } = null!;
    [Required]
    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$", ErrorMessage = "Password must be at least 8 characters and contain at least one uppercase letter, one number and one special character.")]
    public string Password { get; set; } = null!;


}

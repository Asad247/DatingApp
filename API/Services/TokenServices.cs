using System;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.CodeAnalysis;
using Microsoft.IdentityModel.Tokens;


namespace API.Services;

public class TokenServices(IConfiguration configuration) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var TokenKey = configuration["TokenKey"] ?? throw new Exception("TokenKey not found in configuration");
        if (TokenKey.Length <= 64)
        {
            throw new Exception("TokenKey must be at least 64 characters long");
        }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey));

        var claims = new List<Claim>
        {
            new (ClaimTypes.NameIdentifier, user.DisplayName),
            new (ClaimTypes.Email, user.Email)
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };
        var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

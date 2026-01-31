using System;
using System.Security.Cryptography;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Host;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
    {
        if (await IsEmailTaken(dto.Email))
        {
            return BadRequest("Email is already taken");
        }
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            Email = dto.Email,
            //check if email is duplcated before register


            DisplayName = dto.DisplayName,
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(dto.Password)),
            PasswordSalt = hmac.Key
        };


        context.Users.Add(user);
        await context.SaveChangesAsync();

        // return AppUserExtensions.AsUserDto(user, tokenService);
        return user.AsUserDto(tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto dto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == dto.Email.ToLower());

        if (user == null)
        {
            return BadRequest("Invalid email or password");
        }

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(dto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return BadRequest("Invalid email or password");
            }
        }
        // return AppUserExtensions.AsUserDto(user, tokenService);
        return user.AsUserDto(tokenService);

    }


    public async Task<bool> IsEmailTaken(string email)
    {
        // Use ToLower() on both sides to handle casing consistently
        return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}

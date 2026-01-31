using System;
using API.Entities;
using API.DTOs;
using API.Interfaces;
namespace API.Extensions;

public static class AppUserExtensions
{

    public static UserDto AsUserDto(this AppUser user, ITokenService tokenService)
    {
        return new UserDto
        {
            Id = user.id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user),
        };
    }

}

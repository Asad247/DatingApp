using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrinciplesExtensions
{
    public static string GetMemberId(this ClaimsPrincipal User)
    {
        return User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No id in token");
    }
}

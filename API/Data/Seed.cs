using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(AppDbContext appDbContext)
    {
        if (await appDbContext.Users.AnyAsync()) return;

        var MemberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var members = JsonSerializer.Deserialize<List<SeedUserDTO>>(MemberData);

        if (members == null)
        {
            Console.WriteLine("No members");
        }
        else
        {
            using var hmac = new HMACSHA512();

            foreach (var member in members)
            {
                var user = new AppUser
                {
                    Id = member.Id,
                    Email = member.Email,
                    DisplayName = member.DisplayName,
                    ImageUrl = member.ImageUrl,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("XPGpyl0n750wa&&")),
                    PasswordSalt = hmac.Key,
                    Member = new Members
                    {
                        Id = member.Id,
                        DisplayName = member.DisplayName,
                        Description = member.Description,
                        DateOfBirth = member.DateOfBirth,
                        ImageUrl = member.ImageUrl,
                        Gender = member.Gender,
                        City = member.City,
                        Country = member.Country

                    }
                };

                user.Member.Photos.Add(new Photo
                {
                    Url = member.ImageUrl!,
                    MemberId = member.Id,
                });

                appDbContext.Users.Add(user);
            }

            await appDbContext.SaveChangesAsync();
        }
    }
}

using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [Authorize]
    public class MembersController(AppDbContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetMembers()
        {
            // 1. Fetch the entities from the database
            var users = await context.Users.ToListAsync();

            // 2. Map them to DTOs
            var memberDtos = users.Select(member => new UserDto
            {
                Id = member.id,
                Email = member.Email,
                DisplayName = member.DisplayName,
                // We typically do NOT generate new login tokens when just viewing a list of members.
                // If Token is nullable (string?), set it to null. 
                // If it is required, set it to "" or handle accordingly.
                Token = null
            }).ToList();

            return Ok(memberDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetMember(string id)
        {
            var member = await context.Users.FirstOrDefaultAsync(x => x.id == id);

            // if (member == null)
            //     return NotFound();


            return new UserDto
            {
                Id = member!.id,
                Email = member.Email,
                DisplayName = member.DisplayName,
                Token = tokenService.CreateToken(member),

            };
        }
    }
}

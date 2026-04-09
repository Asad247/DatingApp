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
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Members>>> GetMembers()
        {
            return Ok(await memberRepository.GetMembersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Members>> GetMember(string id)
        {
            var member = await memberRepository.GetMembersByIdAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;

        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            return Ok(await memberRepository.GetMemberPhotosByIdAsync(id));
        }
    }
}

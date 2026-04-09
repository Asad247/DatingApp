using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public async Task<IReadOnlyList<Photo>> GetMemberPhotosByIdAsync(string memberId)
    {
        return await context.Members.Where(x => x.Id == memberId)
        .SelectMany(x => x.Photos).ToListAsync();
    }

    public async Task<IReadOnlyList<Members>> GetMembersAsync()
    {
        return await context.Members.ToListAsync();
    }

    public async Task<Members?> GetMembersByIdAsync(string id)
    {
        return await context.Members.FindAsync(id);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Members member)
    {
        context.Entry(member).State = EntityState.Modified;
    }
}

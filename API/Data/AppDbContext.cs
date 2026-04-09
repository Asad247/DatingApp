using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<Members> Members { get; set; }
    public DbSet<Photo> Photo { get; set; }
}

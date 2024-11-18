using FastWorkshopsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FastWorkshopsAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Colaborador> Colaboradores { get; set; }
        public DbSet<Workshop> Workshops { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}

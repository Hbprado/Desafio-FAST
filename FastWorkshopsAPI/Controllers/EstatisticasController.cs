using FastWorkshopsAPI.Data;
using FastWorkshopsAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FastWorkshopsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstatisticasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstatisticasController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetEstatisticas()
        {
            //Quantidade de colaboradores em cada workshop
            var workshopStats = await _context.Workshops
                .Select(w => new
                {
                    w.Nome,
                    Participantes = w.Participantes.Count
                })
                .ToListAsync();

            //Quantidade de workshops em que cada colaborador está participando
            var colaboradorStats = await _context.Colaboradores
                .Select(c => new
                {
                    c.Nome,
                    Participacoes = _context.Workshops
                        .Where(w => w.Participantes.Any(p => p.Id == c.Id))
                        .Count()
                })
                .ToListAsync();

            // Retorna as estatísticas em um objeto combinado
            var estatisticas = new
            {
                WorkshopStats = workshopStats,
                ColaboradorParticipacao = colaboradorStats
            };

            return Ok(estatisticas);
        }
    }
}

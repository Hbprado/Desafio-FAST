using FastWorkshopsAPI.Data;
using FastWorkshopsAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FastWorkshopsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkshopsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkshopsController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var workshops = _context.Workshops.Include(w => w.Participantes).ToList();
            return Ok(workshops);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var workshop = _context.Workshops.Include(w => w.Participantes).FirstOrDefault(w => w.Id == id);
            if (workshop == null)
            {
                return NotFound(new { message = "Workshop não encontrado." });
            }
            return Ok(workshop);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create(Workshop workshop)
        {
            // Filtra os participantes pelo email para garantir que apenas os existentes no banco sejam associados
            var participantesValidos = _context.Colaboradores
                .Where(c => workshop.Participantes.Select(p => p.Email).Contains(c.Email))
                .ToList();

            // Verifica se todos os participantes existem no banco de dados
            var participantesInvalidos = workshop.Participantes
                .Where(p => !participantesValidos.Any(c => c.Email == p.Email))
                .ToList();

            // Se houver participantes inválidos, retorna erro
            if (participantesInvalidos.Any())
            {
                return BadRequest(new
                {
                    message = "Os seguintes colaboradores não foram encontrados e não podem ser associados ao workshop:",
                    colaboradoresInvalidos = participantesInvalidos
                });
            }

            // Substitui os participantes enviados pela lista validada
            workshop.Participantes = participantesValidos;

            // Salva o workshop
            _context.Workshops.Add(workshop);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = workshop.Id }, workshop);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Workshop updatedWorkshop)
        {
            var workshop = _context.Workshops.Include(w => w.Participantes).FirstOrDefault(w => w.Id == id);
            if (workshop == null)
            {
                return NotFound(new { message = "Workshop não encontrado." });
            }

            // Atualiza os campos
            workshop.Nome = updatedWorkshop.Nome;
            workshop.Data = updatedWorkshop.Data;

            _context.SaveChanges();
            return Ok(new { message = "Workshop atualizado com sucesso.", workshop });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var workshop = _context.Workshops.Include(w => w.Participantes).FirstOrDefault(w => w.Id == id);
            if (workshop == null)
            {
                return NotFound(new { message = "Workshop não encontrado." });
            }

            _context.Workshops.Remove(workshop);
            _context.SaveChanges();
            return Ok(new { message = "Workshop excluído com sucesso." });
        }

    }
}

using FastWorkshopsAPI.Data;
using FastWorkshopsAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastWorkshopsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ColaboradoresController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var colaboradores = _context.Colaboradores.ToList();
            return Ok(colaboradores);
        }
        [Authorize]
        [HttpPost]
        public IActionResult Create(Colaborador colaborador)
        {
            _context.Colaboradores.Add(colaborador);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAll), new { id = colaborador.Id }, colaborador);
        }
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var colaborador = _context.Colaboradores.Find(id);
            if (colaborador == null)
            {
                return NotFound(new { message = "Colaborador não encontrado." });
            }
            return Ok(colaborador);
        }
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Colaborador updatedColaborador)
        {
            var colaborador = _context.Colaboradores.Find(id);
            if (colaborador == null)
            {
                return NotFound(new { message = "Colaborador não encontrado." });
            }

            // Atualiza os campos
            colaborador.Nome = updatedColaborador.Nome;

            _context.SaveChanges();
            return Ok(new { message = "Colaborador atualizado com sucesso.", colaborador });
        }
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var colaborador = _context.Colaboradores.Find(id);
            if (colaborador == null)
            {
                return NotFound(new { message = "Colaborador não encontrado." });
            }

            _context.Colaboradores.Remove(colaborador);
            _context.SaveChanges();
            return Ok(new { message = "Colaborador excluído com sucesso." });
        }
    }
}

using FastWorkshopsAPI.Data;
using FastWorkshopsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DotNetEnv;


namespace FastWorkshopsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _secretKey;

        public AuthController(AppDbContext context)
        {
            _context = context;

            DotNetEnv.Env.Load();
            _secretKey = Environment.GetEnvironmentVariable("JWT_SECRET") ?? throw new InvalidOperationException("JWT_SECRET não configurado.");
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Users.Any(u => u.Email == model.Email || u.Username == model.Username))
            {
                return BadRequest(new { message = "Email ou nome de usuário já em uso." });
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var user = new User
            {
                Username = model.Username,
                PasswordHash = passwordHash,
                Email = model.Email
            };

            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao registrar usuário.", details = ex.Message });
            }

            return Ok(new { message = "Usuário registrado com sucesso." });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _context.Users.SingleOrDefault(u => u.Username == login.Username);
            if (user == null)
            {
                return Unauthorized(new { message = "Usuário não encontrado." });
            }

            if (!BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Senha inválida." });
            }

            // Gerar e retornar o token
            var token = GenerateJwtToken(user);
            return Ok(new { message = "Login realizado com sucesso.", token });
        }

        private string GenerateJwtToken(User user)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)); // Mesma chave
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddHours(1),
                claims: claims,
                signingCredentials: creds
            );
            Console.WriteLine("token: " + token);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

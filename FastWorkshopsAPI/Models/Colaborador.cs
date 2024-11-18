namespace FastWorkshopsAPI.Models
{
    public class Colaborador
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        // Propriedade de validação para garantir que o Email seja único
        public Colaborador()
        {
            Email = Email.ToLower();
        }
    }
}

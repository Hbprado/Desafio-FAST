namespace FastWorkshopsAPI.Models
{
    public class Workshop
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public List<Colaborador> Participantes { get; set; } = new();
    }
}

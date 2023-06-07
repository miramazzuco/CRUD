namespace Rpg.Models
{
    public class Personagem
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Sobrenome { get; set; } = string.Empty;
        public string Fantasia { get; set; } = string.Empty;
        public string Local { get; set; } = string.Empty;
    }
}

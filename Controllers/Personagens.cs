using Microsoft.AspNetCore.Mvc;
using Rpg.Models;
namespace Rpg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonagensController : Controller
    {
        private static List<Personagem> personagens = new List<Personagem>
        {
                new Personagem
                {
                    Id = 1,
                    Nome = "Peter",
                    Sobrenome = "Parker",
                    Fantasia = "Homem-aranha",
                    Local = "NY city"
                },
                new Personagem
                {
                    Id = 2,
                    Nome = "Wade",
                    Sobrenome = "Wilson",
                    Fantasia = "Deadpool",
                    Local = "NY city"
                }
            };

        [HttpGet]
        public async Task<ActionResult<List<Personagem>>> LerTodosPersonagens()
        {
            return Ok(personagens);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Personagem>>> LerUnicoPersonagem(int id)
        {
            var unico = personagens.Find(x => x.Id == id);

            if (unico is null)
                return NotFound("Personagem não encontrado");

            return Ok(unico);
        }

        [HttpGet("local/{local}")]
        public async Task<ActionResult<List<Personagem>>> LocalPersonagem(string local)
        {
            var pesquisa = personagens.FindAll(x => x.Local == local);

            if (pesquisa is null)
                return NotFound("Personagem não existe");

            return Ok(pesquisa);
        }

        [HttpPost]
        public async Task<ActionResult<List<Personagem>>> AddPersonagem(Personagem novo)
        {
            if (novo.Id == 0 && personagens.Count > 0)//SEM EXPRESSÃO TERNÁRIA
                novo.Id = personagens[personagens.Count - 1].Id + 1;

            //COM EXPRESSÃO TERNÁRIA
            //novo.Id = novo.Id == 0 ? personagens[personagens.Count - 1].Id + 1 : novo.Id;

            personagens.Add(novo);
            return Ok(personagens);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Personagem>>> AlteraPersonagem(int id, Personagem editar)
        {
            var pesquisa = personagens.Find(x => x.Id == id);

            if (pesquisa is null)
                return NotFound("Personagem não existe");

            pesquisa.Nome = editar.Nome == "" || editar.Nome == "string" ? pesquisa.Nome : editar.Nome;
            pesquisa.Sobrenome = editar.Sobrenome == "" || editar.Sobrenome == "string" ? pesquisa.Sobrenome : editar.Sobrenome;
            pesquisa.Fantasia = editar.Fantasia == "" || editar.Fantasia == "string" ? pesquisa.Fantasia : editar.Fantasia;
            pesquisa.Local = editar.Local == "" || editar.Local == "string" ? pesquisa.Local : editar.Local;

            return Ok(pesquisa);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Personagem>>> DeletaPersonagem(int id)
        {
            var pesquisa = personagens.Find(x => x.Id == id);

            if (pesquisa is null)
                return NotFound("Personagem não existe");

            personagens.Remove(pesquisa);
            return Ok(personagens);
        }
    }
}

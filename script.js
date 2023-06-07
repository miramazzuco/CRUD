let nameHero, surnameHero, fantasy, locale;

const formulario = document.querySelector(".form");
const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputFantasia = document.getElementById("fantasia");
const inputLocal = document.getElementById("local");
let urlPadrao = "http://localhost:5160/api/Personagens";

function addNome() {
  nameHero = inputNome.value;
  nameHero = nameHero.toLowerCase();
  console.log(inputNome.value); //INSPECAO
}

function addSobrenome() {
  surnameHero = inputSobrenome.value;
  surnameHero = surnameHero.toLowerCase();
  console.log(inputSobrenome.value);
}

function addFantasia() {
  fantasy = inputFantasia.value;
  fantasy = fantasy.toLowerCase();
  console.log(inputFantasia.value);
}

function addLocal() {
  locale = inputLocal.value;
  locale = locale.toLowerCase();
  console.log(inputLocal.value);
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  registrar();
  formulario.reset();
});

const fetchRPG = async (id) => {
  const url = !id ? urlPadrao : `${urlPadrao}/${id}`;

  const APIresponse = await fetch(url);
  if (APIresponse.status === 200) {
    const dados = await APIresponse.json();
    return dados;
  }
};

const buscaHerois = async () => {
  const dados = await fetchRPG();

  if (dados) {
    reendeniza(dados);
  }
};

const registrar = async () => {
  let dadosFinais = {
    id: 0,
    nome: nameHero[0].toUpperCase() + nameHero.substring(1),
    sobrenome: surnameHero[0].toUpperCase() + surnameHero.substring(1),
    fantasia: fantasy[0].toUpperCase() + fantasy.substring(1),
    local: locale[0].toUpperCase() + locale.substring(1),
  };

  let options = {
    method: "POST", //METODO A SER USADO
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosFinais), //dadosfinais SE TORNOU UMA VARIAVEL UNICA
  };

  await fetch(urlPadrao, options)
    .then((resp) => {
      return resp.json();
    })
    .then((dados) => {
      reendeniza(dados);
    })
    .catch((e) => {
      alert(e);
    });
};

const exclusao = async (id) => {
    let options = {
        method: "DELETE", //METODO A SER USADO
      };

      await fetch(urlPadrao + "/" + id, options)
      .then((resp) =>{
        return resp.json();
      })
      .then((dados) =>{
        reendeniza(dados);
      })
      .catch(() =>{
        alert ("Não foi possivel excluir");
      });
};

const reendeniza = (dados) => {
  if (!dados) {
    const div = document.getElementById("tabela");
    if (div) {
      div.style.display = "none";
    }
  } else {
    let table = document.getElementById("tabelaHerois");

    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    let tituloLinha = document.createElement("tr");

    let titulo1 = document.createElement("th");
    titulo1.textContent = "Nome";
    let titulo2 = document.createElement("th");
    titulo2.textContent = "Sobremome";
    let titulo3 = document.createElement("th");
    titulo3.textContent = "Fantasia";
    let titulo4 = document.createElement("th");
    titulo4.textContent = "Local";

    tituloLinha.appendChild(titulo1);
    tituloLinha.appendChild(titulo2);
    tituloLinha.appendChild(titulo3);
    tituloLinha.appendChild(titulo4);

    table.appendChild(tituloLinha);

    dados.forEach((heroi) => {
      let dadosLinha = document.createElement("tr");

      let dados1 = document.createElement("td");
      dados1.textContent = heroi.nome;
      let dados2 = document.createElement("td");
      dados2.textContent = heroi.sobrenome;
      let dados3 = document.createElement("td");
      dados3.textContent = heroi.fantasia;
      let dados4 = document.createElement("td");
      dados4.textContent = heroi.local;

      let editar = document.createElement("img");

      editar.onclick = function () {
        alert("Editando o herói de id " + heroi.id);
      };

      let excluir = document.createElement("img");

      excluir.onclick = function () {
        exclusao(heroi.id);
      };

      editar.src = "IMG/escrever (2).png";
      excluir.src = "IMG/lixeira (2).png";

      let dados5 = document.createElement("td");
      dados5.appendChild(editar);
      let dados6 = document.createElement("td");
      dados6.appendChild(excluir);

      dadosLinha.appendChild(dados1);
      dadosLinha.appendChild(dados2);
      dadosLinha.appendChild(dados3);
      dadosLinha.appendChild(dados4);
      dadosLinha.appendChild(dados5);
      dadosLinha.appendChild(dados6);

      table.appendChild(dadosLinha);
    });
  }
};





buscaHerois();

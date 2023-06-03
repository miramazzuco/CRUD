let nameHero, surnameHero, fantasy, locale;

const formulario = document.querySelector(".form")
const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputFantasia = document.getElementById("fantasia");
const inputLocal = document.getElementById("local");


function addNome(){
    nameHero = inputNome.value;
    console.log(inputNome.value); //INSPECAO
}

function addSobrenome(){
    surnameHero = inputSobrenome.value;
    console.log(inputSobrenome.value);
}

function addFantasia(){
    fantasy = inputFantasia.value;
    console.log(inputFantasia.value);
}

function addLocal(){
    locale = inputLocal.value;
    console.log(inputLocal.value);
}

formulario.addEventListener("submit",(evento) => {
    evento.preventDefault();
   // alert(`O herói é ${nameHero} ${fantasy}`)
    registrar();
});

const fetchRPG = async (id) => {
    const url = !id
    ? "http://localhost:5204/PERSONAGENS"
    : `http://localhost:5204/PERSONAGENS/${id}`;

    const APIresponse = await fetch (url);
    if (APIresponse.status === 200){
        const dados = await APIresponse.json();
        return dados;
    }
};

const buscaHerois = () => {};

const registrar = async () => {
    let dadosFinais = {
        id:0,
        nome: nameHero.toString(),
        sobrenome:surnameHero.toString(),
        fantasia: fantasy.toString(),
        local: locale.toString(),
    };

    let options = {
        method: "POST", //METODO A SER USADO
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosFinais)//dadosfinais SE TORNOU UMA VARIAVEL UNICA
    };

    await fetch("http://localhost:5204/PERSONAGENS", options)
    .then((resp) => {
        resp.json()
    })
    .then((dados) => {
        buscaHerois(dados);
    })
    .catch((error) => {
        alert(error.toString());
    })

};
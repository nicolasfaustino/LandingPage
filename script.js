const loginDiv = document.getElementById("loginDiv");
const loginDialog = document.getElementById("login");
const btnFechar = document.getElementById("btnFechar");
const login = document.getElementById('login');
const formLogin = document.querySelector('#login form');
let dadosUsuarios = [
    { nome: "user", email: "email@email.com", senha: "123" },
    { nome: "aluno", email: "aluno@email.com", senha: "aluno" },
    { nome: "root", email: "root@email.com", senha: "root" },
];

loginDiv.addEventListener("click", (event) => {
    event.preventDefault();
    loginDialog.style.display = "flex";
});

btnFechar.addEventListener("click", () => {
    document.body.removeChild(loginDialog);
});

formLogin.addEventListener('submit', evento =>{
    evento.preventDefault();

    let msgErro = document.querySelector('.erro');
    if(msgErro) login.removeChild(msgErro);

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    dadosUsuarios.forEach(usuario =>{
        console.log(email, senha);
        if (email == usuario.email && senha == usuario.senha) {
            sessionStorage.setItem('usuarioLogado', true);
            sessionStorage.setItem('nomeUsuario', usuario.nome);

            window.location.href = "./adminpage/index.html";
        }
    });

    let usuarioLogado = sessionStorage.getItem('usuarioLogado');

    if(!usuarioLogado){
        let erro = document.createElement('p');
        erro.classList.add("erro");
        erro.innerText = "Login ou senha inválidos!";
        login.insertBefore(erro, login.firstChild);
        document.querySelector("#login form").reset();
    }
});
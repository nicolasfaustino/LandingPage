let login = sessionStorage.getItem('usuarioLogado');

if(!login){
    window.location.href = "../index.html";
}

let usuario = sessionStorage.getItem('nomeUsuario');

document.getElementById('logout').addEventListener('click', () =>{
    console.log('logout');
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('nomeUsuario');
    window.location.href = "../index.html";
});

let dados = JSON.parse(localStorage.getItem('dados')) || [];

let local = document.getElementById('local');
let terreno = document.getElementById('terreno');
let tamanho = document.getElementById('tamanho');
let finalidade = document.getElementById('finalidade');

const chave = new URLSearchParams(window.location.search).get('chave');

if(chave){
    local.value = dados[chave].local;
    terreno.value = dados[chave].terreno;
    tamanho.value = dados[chave].tamanho;
    finalidade.value = dados[chave].finalidade;
    document.querySelector('#formProduto button[type="submit"]').innerText = "Alterar";
}

document.getElementById("formProduto").addEventListener('submit', e =>{
    e.preventDefault();

    const produto = {
        local: local.value,
        terreno: terreno.value,
        tamanho: tamanho.value,
        finalidade: finalidade.value
    };

    (!chave)? dados.push(produto): dados[chave] = produto;

    localStorage.setItem('dados', JSON.stringify(dados));

    window.location.href = "./index.html";
});

function atualizarTabela() {
    const tbody = document.querySelector("#tabela tbody");
    dados.forEach( (produto, chave) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.local}</td>
            <td>${produto.terreno}m²</td>
            <td>${produto.tamanho}m²</td>
            <td>${produto.finalidade}</td>
            <td>
                <a class="table_edit" href="?chave=${chave}">Editar</a>
                <a class="table_remove" href="#" onclick="removerProduto(${chave})">Excluir</a>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

function removerProduto(id) {
    dados.splice(id, 1);
    localStorage.setItem('dados', JSON.stringify(dados));
    window.location.reload();
}

window.onload = atualizarTabela;



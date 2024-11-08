// ------------------------------------------------------------------------------------------------------------
// -- Código para verificar se o usuário está logado
// ------------------------------------------------------------------------------------------------------------
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
// ------------------------------------------------------------------------------------------------------------
// -- Código de carregamento dos dados do formulário
// ------------------------------------------------------------------------------------------------------------
let dadosImoveis = JSON.parse(localStorage.getItem('dadosImoveis')) || [];
let dadosVendas = JSON.parse(localStorage.getItem('dadosVendas')) || [];
let dadosFuncionarios = JSON.parse(localStorage.getItem('dadosFuncionarios')) || [];

let local = document.getElementById('local');
let terreno = document.getElementById('terreno');
let tamanho = document.getElementById('tamanho');
let finalidade = document.getElementById('finalidade');
let cliente = document.getElementById('cliente');
let vendedor = document.getElementById('vendedor');
let valor = document.getElementById('valor');
let finalidadeSells = document.getElementById('finalidadeSells');
let nameFunc = document.getElementById('nameFunc');
let sells = document.getElementById('sells');
let salary = document.getElementById('salary');
let functionFunc = document.getElementById('functionFunc');

const chave = new URLSearchParams(window.location.search).get('chave');

if(chave){
    const [table, id] = chave.split('_');
    if (table === 'imoveis') {
        local.value = dadosImoveis[id].local;
        terreno.value = dadosImoveis[id].terreno;
        tamanho.value = dadosImoveis[id].tamanho;
        finalidade.value = dadosImoveis[id].finalidade;
        document.querySelector('#formProduto_imoveis button[type="submit"]').innerText = "Alterar";
    } else if (table === 'vendas') {
        cliente.value = dadosVendas[id].cliente;
        vendedor.value = dadosVendas[id].vendedor;
        valor.value = dadosVendas[id].valor;
        finalidadeSells.value = dadosVendas[id].finalidadeSells;
        document.querySelector('#formProduto_vendas button[type="submit"]').innerText = "Alterar";
    } else if (table === 'funcionarios') {
        nameFunc.value = dadosFuncionarios[id].nameFunc;
        sells.value = dadosFuncionarios[id].sells;
        salary.value = dadosFuncionarios[id].salary;
        functionFunc.value = dadosFuncionarios[id].functionFunc;
        document.querySelector('#formProduto_funcionarios button[type="submit"]').innerText = "Alterar";
    }

    var elemento = document.getElementById(table);
    if (elemento) {
        elemento.scrollIntoView();
    }
}
// ------------------------------------------------------------------------------------------------------------
// -- Código de submissão do formulário
// ------------------------------------------------------------------------------------------------------------
document.getElementById("formProduto_imoveis").addEventListener('submit', e =>{
    e.preventDefault();

    const imoveis = {
        local: local.value,
        terreno: terreno.value,
        tamanho: tamanho.value,
        finalidade: finalidade.value
    };

    if (!chave) {
        dadosImoveis.push(imoveis);
    } else {
        const [table, id] = chave.split('_');
        dadosImoveis[id] = imoveis;
    }

    localStorage.setItem('dadosImoveis', JSON.stringify(dadosImoveis));

    window.location.href = "./index.html";
});

document.getElementById("formProduto_vendas").addEventListener('submit', e =>{
    e.preventDefault();

    const vendas = {
        cliente: cliente.value,
        vendedor: vendedor.value,
        valor: valor.value,
        finalidadeSells: finalidadeSells.value
    };

    if (!chave) {
        dadosVendas.push(vendas);
    } else {
        const [table, id] = chave.split('_');
        dadosVendas[id] = vendas;
    }

    localStorage.setItem('dadosVendas', JSON.stringify(dadosVendas));

    window.location.href = "./index.html";
});

document.getElementById("formProduto_funcionarios").addEventListener('submit', e =>{
    e.preventDefault();

    const funcionarios = {
        nameFunc: nameFunc.value,
        sells: sells.value,
        salary: salary.value,
        functionFunc: functionFunc.value
    };

    if (!chave) {
        dadosFuncionarios.push(funcionarios);
    } else {
        const [table, id] = chave.split('_');
        dadosFuncionarios[id] = funcionarios;
    }

    localStorage.setItem('dadosFuncionarios', JSON.stringify(dadosFuncionarios));

    window.location.href = "./index.html";
});

// ------------------------------------------------------------------------------------------------------------
// -- Código para atualizar a tabela
// ------------------------------------------------------------------------------------------------------------
function atualizarTabela() {
    const tbodyImoveis = document.querySelector("#tabela_imoveis tbody");
    dadosImoveis.forEach( (imoveis, chave) => {
        const linhaImoveis = document.createElement('tr');
        linhaImoveis.innerHTML = `
            <td>${imoveis.local}</td>
            <td>${imoveis.terreno}m²</td>
            <td>${imoveis.tamanho}m²</td>
            <td>${imoveis.finalidade}</td>
            <td>
                <a class="table_edit" href="?chave=imoveis_${chave}">Editar</a>
                <a class="table_remove" href="#" onclick="removerProduto('Imoveis',${chave})">Excluir</a>
            </td>
        `;
        tbodyImoveis.appendChild(linhaImoveis);
    });

    const tbodyVendas = document.querySelector("#tabela_vendas tbody");
    dadosVendas.forEach( (vendas, chave) => {
        const linhaVendas = document.createElement('tr');
        linhaVendas.innerHTML = `
            <td>${vendas.cliente}</td>
            <td>${vendas.vendedor}</td>
            <td>R$ ${vendas.valor}</td>
            <td>${vendas.finalidadeSells}</td>
            <td>
                <a class="table_edit" href="?chave=vendas_${chave}">Editar</a>
                <a class="table_remove" href="#" onclick="removerProduto('Vendas',${chave})">Excluir</a>
            </td>
        `;
        tbodyVendas.appendChild(linhaVendas);
    });

    const tbodyFuncionarios = document.querySelector("#tabela_funcionarios tbody");
    dadosFuncionarios.forEach( (funcionarios, chave) => {
        const linhaFuncionarios = document.createElement('tr');
        linhaFuncionarios.innerHTML = `
            <td>${funcionarios.nameFunc}</td>
            <td>${funcionarios.sells}</td>
            <td>R$ ${funcionarios.salary}</td>
            <td>${funcionarios.functionFunc}</td>
            <td>
                <a class="table_edit" href="?chave=funcionarios_${chave}">Editar</a>
                <a class="table_remove" href="#" onclick="removerProduto('Funcionarios',${chave})">Excluir</a>
            </td>
        `;
        tbodyFuncionarios.appendChild(linhaFuncionarios);
    });
}

// ------------------------------------------------------------------------------------------------------------
// -- Código para adicionar e remover produtos
// ------------------------------------------------------------------------------------------------------------
function removerProduto(table,id) {
    if (table === 'Imoveis') {
        dados = dadosImoveis;
    } else if (table === 'Vendas') {
        dados = dadosVendas;
    } else if (table === 'Funcionarios') {
        dados = dadosFuncionarios;
    }

    dados.splice(id, 1);
    localStorage.setItem('dados'+table, JSON.stringify(dados));
    window.location.reload();
}

window.onload = atualizarTabela;



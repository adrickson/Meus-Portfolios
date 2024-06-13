const btnAdicionarTarefa = document.querySelector('#abreJanela');
const contTarefas = document.querySelector('.cont_tarefas');

const containerPaiDivs = document.querySelector('.lista-tarefas'); // container pai onde armazenara os container que ficarão responsáveis por armazenar o conteúdo.

const paragrafoTemporario = document.querySelector('#avisoTemporario'); // Aviso inserido até enviar o formulário

// Variáveis do formulário de adicionar tarefa
const formulario = document.querySelector('.formulario');
const btnFinalizar = document.querySelector('#finalizar');
const btnCancelar = document.querySelector('#cancelar');
const caixaInput = document.querySelector('#descricao');

// Variáveis do formulário da Janela de Editar tarefa
const btnCancelarTarefa = document.querySelector('#btnCancelarEdicao');
const inputEditarTarefa = document.querySelector('#inputEditaTarefa');
const btnFinalizarEdicao = document.querySelector('#btnFinalizarEdicao');
const txtMostradoJanelaEditar = document.querySelector('#textoASerMostrado');

let tarefaParaEditar = null;
let idParaEditar = null;

function abreJanela() {
    // Função para Abrir o PopUp
    contTarefas.style.display = 'none';

    if (contTarefas.style.display == 'none') {
        contTarefas.style.display = 'block';
    }
}

// Função para Fechar o PopUp
function fechaJanela() {
    if (contTarefas.style.display == 'block') {
        contTarefas.style.display = 'none';
        caixaInput.value = '';
    }
}

btnCancelar.addEventListener('click', fechaJanela);

btnAdicionarTarefa.addEventListener('click', abreJanela);

// FUNÇÃO DE APARECER JANELA DE EDITAR TAREFA
function abreJanelaDeEditar(tarefa, id) {
    // A janela de editar está recebendo o parágrafo da div em que o ícone de edição foi clicado.
    const janelaDeEdicaoTarefa = document.querySelector('.janelaEditarTarefa');
    inputEditarTarefa.value = '';
    tarefaParaEditar = tarefa; // A tarefa que foi definida como null, está recebendo o texto da tarefa
    tarefaAserEditada = tarefaParaEditar.innerHTML;
    txtMostradoJanelaEditar.innerHTML = `" ${tarefaAserEditada} "`;
    idParaEditar = id;
    abrePopUp(janelaDeEdicaoTarefa);
}

// Função de criar o ícone de editar
function criaIconeEditar() {
    const iconeEditar = document.createElement('span');
    iconeEditar.classList.add('material-symbols-outlined');
    iconeEditar.innerHTML = 'draw';
    return iconeEditar;
}

// Função de criar ícone de deletar
function criaIconeDeletar() {
    const iconeDeletar = document.createElement('span');
    iconeDeletar.classList.add('material-symbols-outlined');
    iconeDeletar.innerHTML = 'delete';
    return iconeDeletar;
}

// Função de Adicionar tarefa
function adicionaTarefa() {
    const texto = caixaInput.value;

    if (texto === '') {
        paragrafoTemporario.style.display = 'block';
    } else {
        paragrafoTemporario.innerHTML = ``;
        const criaP = document.createElement('p');
        criaP.innerHTML = texto;
        const criaDiv = document.createElement('div');
        criaDiv.classList.add('armazena_texto');

        const iconeEditar = criaIconeEditar();
        const iconeDeletar = criaIconeDeletar();
        const id = Date.now();

        iconeEditar.addEventListener('click', function () {
            abreJanelaDeEditar(criaP, id); // chamando o evento de abrir a janela de editar e passando o parágrafo como parâmetro.
        });

        iconeDeletar.addEventListener('click', function () {
            deletaTarefa(criaDiv, criaP, id); // chama a função de deletar tarefa passando a div em qual a tarefa está armazenada.
        });

        criaDiv.appendChild(criaP);
        criaDiv.appendChild(iconeEditar);
        criaDiv.appendChild(iconeDeletar);

        containerPaiDivs.appendChild(criaDiv);

        salvarTarefaLocalStorage(texto, id); // chamando a função de salvar tarefas no localStorage do navegador, passando como parâmetro o texto que estará presente no parágrafo.

        fechaJanela();
    }
}

btnFinalizar.addEventListener('click', adicionaTarefa);

// CRIANDO FUNÇÃO EXCLUSIVA PARA EXIBIR JANELAS (DIVS, SECTIONS, ETC)
function abrePopUp(janelaASerAberta) {
    janelaASerAberta.style.display = 'none';

    if (janelaASerAberta.style.display === 'none') {
        janelaASerAberta.style.display = 'block';
    }

    return janelaASerAberta;
}

// CRIANDO FUNÇÃO EXCLUSIVA PARA FECHAR JANELAS (DIVS, SECTIONS, ETC)
function fechaPopUp(janelaASerFechada) {
    if (janelaASerFechada.style.display === 'block') {
        janelaASerFechada.style.display = 'none';
    }
}

// FUNÇÃO DE FINALIZAR EDIÇÃO
btnFinalizarEdicao.addEventListener('click', function () {
    if (tarefaParaEditar) { // Verificando se a tarefa tem o estado True.
        const novoTexto = inputEditarTarefa.value;
        tarefaParaEditar.innerHTML = novoTexto; // A tarefa da lista de tarefas está recebendo o valor do input da janela de editar tarefa.

        editarTarefaLocalStorage(idParaEditar, novoTexto);

        const janelaDeEdicaoTarefa = document.querySelector('.janelaEditarTarefa');

        fechaPopUp(janelaDeEdicaoTarefa);

        inputEditarTarefa.value = '';

        tarefaParaEditar = null;
        idParaEditar = null;
    }
});

// FUNÇÃO DE FECHAR A JANELA DE EDITAR TAREFA
btnCancelarTarefa.addEventListener('click', function () {
    const janelaDeEdicaoTarefa = document.querySelector('.janelaEditarTarefa');
    fechaPopUp(janelaDeEdicaoTarefa);

    inputEditarTarefa.value = '';
})

// FUNÇÃO DE DELETAR TAREFA
function deletaTarefa(divTarefa, paragrafo, id) {
    divTarefa.remove();
    removerTarefaLocalStorage(id);
}

// Função para evitar o envio do formulário
function cancelaOperacao(evento) {
    evento.preventDefault(); // Evita o envio do formulário.
}

formulario.addEventListener('submit', cancelaOperacao);

// CRIANDO LÓGICA DE SALVAR TAREFAS NO BANCO DE DADOS DO NAVEGADOR (LOCALSTORAGE)
function salvarTarefaLocalStorage(tarefa, id) {
    let tarefas = localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : []; // se localStorage.getItem('tarefas') existir ele é convertido para um array, se não existir é convertido para um array vazio e armazenado na variável tarefas.

    tarefas.push({ id, texto: tarefa }); // estou enviando um Objeto com o texto da tarefa e seu identificador.

    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // estou setando no localStorage um JSON de string.
}

function carregarTarefas() { // Essa função é inicializada assim que a página é carregada
    let tarefas = localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : []; // se localStorage.getItem('tarefas') existir ele é convertido para um array, se não existir é convertido para um array vazio e armazenado na variável tarefas.

    tarefas.forEach(function ({ id, texto }) { // o foreach itera sobre cada item do localStorage e em seguida sua função adiciona os elementos ao dom.
        const criaP = document.createElement('p');
        criaP.innerHTML = texto;

        const criaDiv = document.createElement('div');
        criaDiv.classList.add('armazena_texto');

        const iconeEditar = criaIconeEditar();
        iconeEditar.addEventListener('click', function () {
            abreJanelaDeEditar(criaP, id);
        });

        const iconeDeletar = criaIconeDeletar();
        iconeDeletar.addEventListener('click', function () {
            deletaTarefa(criaDiv, criaP, id);
        });

        criaDiv.appendChild(criaP);
        criaDiv.appendChild(iconeEditar);
        criaDiv.appendChild(iconeDeletar);

        containerPaiDivs.appendChild(criaDiv);
    });
}

function editarTarefaLocalStorage(id, novoTexto) {
    let tarefas = localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : [];

    const index = tarefas.findIndex(tarefa => tarefa.id === id); // encontrar a tarefa pelo id
    if (index !== -1) { // verifica se encontrou a posição da tarefa antiga, se não encontrou ele recebe -1 e o array de tarefas recebe a nova tarefa na posição da antiga.
        tarefas[index].texto = novoTexto;
    }

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function removerTarefaLocalStorage(id) {
    let tarefas = localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : [];

    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
        tarefas.splice(index, 1);
    }

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

carregarTarefas();

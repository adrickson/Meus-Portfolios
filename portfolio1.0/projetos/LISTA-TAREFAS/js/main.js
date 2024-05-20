const btnAdicionarTarefa = document.querySelector('#abreJanela');
const contTarefas = document.querySelector('.cont_tarefas');

const containerPaiDivs = document.querySelector('.lista-tarefas') // container pai onde armazenara os container que ficarão responsáveis por armazenar o conteúdo.

const paragrafoTemporario = document.querySelector('#avisoTemporario') // Aviso inserido até enviar o formulário

// Variáveis do formulário de adicionar tarefa
const formulario = document.querySelector('.formulario');
const btnFinalizar = document.querySelector('#finalizar');
const btnCancelar = document.querySelector('#cancelar');
const caixaInput = document.querySelector('#descricao');

function abreJanela(){

    // Função para Abrir o PopUp

    contTarefas.style.display = 'none';

    if(contTarefas.style.display == 'none') {
        contTarefas.style.display = 'block';
    }

    // Função para Fechar o PopUp

    function fechaJanela(){
        if(contTarefas.style.display == 'block'){
            contTarefas.style.display = 'none';
            caixaInput.value = '';
        }
    }

    btnCancelar.addEventListener('click', fechaJanela);

    // Função de criar o ícone de editar

    function criaIconeEditar(){

        const iconeEditar = document.createElement('span');
        iconeEditar.classList.add('material-symbols-outlined');
        iconeEditar.innerHTML = 'draw';

        return iconeEditar;
    }

    // Função de criar ícone de deletar

    function ciraIconeDeletar(){
        const iconeDeletar = document.createElement('span');
        iconeDeletar.classList.add('material-symbols-outlined');
        iconeDeletar.innerHTML = 'delete';

        return iconeDeletar;
    }

    // Função de Adicionar tarefa

    function adicionaTarefa(){
        const texto = caixaInput.value;

        if(texto === ''){
            paragrafoTemporario.style.display = 'block';
        } else {
            paragrafoTemporario.innerHTML = `<p>Minhas Tarefas:</p>`;

            const criaP = document.createElement('p');
            criaP.innerHTML = texto;

            const criaDiv = document.createElement('div');
            criaDiv.classList.add('armazena_texto');

            const iconeEditar = criaIconeEditar();
            const iconeDeletar = ciraIconeDeletar();

            iconeEditar.addEventListener('click', abreJanelaDeEditar);

            criaDiv.appendChild(criaP);
            criaDiv.appendChild(iconeEditar);
            criaDiv.appendChild(iconeDeletar);
            
            containerPaiDivs.appendChild(criaDiv);
            
            
            fechaJanela();
        }
        
    }

    btnFinalizar.addEventListener('click', adicionaTarefa);

    // CRIANDO FUNÇÃO EXCLUSIVA PARA EXIBIR JANELAS (DIVS, SECTIONS, ETC)

    function abrePopUp(janelaASerAberta){
        janelaASerAberta.style.display = 'none';

        if (janelaASerAberta.style.display === 'none'){
            janelaASerAberta.style.display = 'block';
        }

        return janelaASerAberta;
    }

    // CRIANDO FUNÇÃO EXCLUSIVA PARA FECHAR JANELAS (DIVS, SECTIONS, ETC)

    function fechaPopUp(janelaASerFechada){

        if(janelaASerFechada.style.display === 'block'){
            janelaASerFechada.style.display = 'none';
        }
    }

    // FUNÇÃO DE APARECER JANELA DE EDITAR TAREFA

    function abreJanelaDeEditar(){

        const janelaDeEdicaoTarefa = document.querySelector('.janelaEditarTarefa');
        abrePopUp(janelaDeEdicaoTarefa);
    }
 

    // Função para evitar o envio do formulário

    function cancelaOperacao(evento) {
        evento.preventDefault(); // Evita o envio do formulário.

    }

    formulario.addEventListener('submit', cancelaOperacao);

}

btnAdicionarTarefa.addEventListener('click', abreJanela);

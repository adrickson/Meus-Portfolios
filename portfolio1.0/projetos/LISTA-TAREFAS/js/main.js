const btnAdicionarTarefa = document.querySelector('#abreJanela');
const contTarefas = document.querySelector('.cont_tarefas');
const contListaTarefas = document.querySelector('.lista-tarefas') // container onde será adicionado as tarefas enviadas
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

    // Função de Adicionar tarefa

    function adicionaTarefa(){
        const texto = caixaInput.value;

        if(texto === ''){
            paragrafoTemporario.style.display = 'block';
        } else {
            paragrafoTemporario.innerHTML = `<p>Minhas Tarefas:</p>`;
            
            const novaTarefa = document.createElement('p');
            novaTarefa.innerHTML = texto;

            contListaTarefas.appendChild(novaTarefa);
            fechaJanela();
        }
        
    }

    btnFinalizar.addEventListener('click', adicionaTarefa);

    // Função para evitar o envio do formulário

    function cancelaOperacao(evento) {
        evento.preventDefault(); // Evita o envio do formulário.

    }

    formulario.addEventListener('submit', cancelaOperacao);

}

btnAdicionarTarefa.addEventListener('click', abreJanela);

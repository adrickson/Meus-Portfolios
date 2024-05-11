const btnAdicionarTarefa = document.querySelector('#abreJanela');
const contTarefas = document.querySelector('.cont_tarefas');

// Variáveis do formulário de adicionar tarefa
const formulario = document.querySelector('.formulario');
const btnFinalizar = document.querySelector('#finalizar');
const btnCancelar = document.querySelector('#cancelar');

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
        }
    }

    btnCancelar.addEventListener('click', fechaJanela);

    function cancelaOperacao(evento) {
        evento.preventDefault(); // Evita o envio do formulário.

    }

    formulario.addEventListener('submit', cancelaOperacao);

}

btnAdicionarTarefa.addEventListener('click', abreJanela);

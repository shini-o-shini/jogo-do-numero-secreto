let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentantivas = 1

function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto!');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10!');
}

exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentantivas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o Número Secreto com ${tentantivas} ${palavraTentativa}!`
        exibirTextoNaTela('h1', 'Parabéns!')
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p','O Número Secreto é maior que ' + chute + ', tente de novo!');
        } else {
            exibirTextoNaTela('p','O Número Secreto é menor que ' + chute + ', tente de novo!');
        }
        tentantivas++;
        console.log(numeroSecreto);
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparInput() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparInput();
    tentantivas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
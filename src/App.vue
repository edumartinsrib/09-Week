<script setup>
import { ref, watch } from "vue";

//definição das variáveis reativas
const status = ref("");
const classeStatus = ref("")
const pontosAdversario = ref(0);
const pontosJogador = ref(0);
const jogadasRestante = ref(0);
const cartaRandom = ref(0);
const cartasJogador = ref([]);
const cartasAdversario = ref([]);


//função para gerar novo jogo
function novoJogo() {
  status.value = 'Você está jogando';
  classeStatus.value = 'text-white bg-info rounded ms-2 p-2';
  pontosJogador.value = 0;
  pontosAdversario.value = 17;
  jogadasRestante.value = 5;
  cartaRandom.value = 0;
  cartasJogador.value = [];
  cartasAdversario.value = [{ valor: 4, letra: 'C' }, { valor: 5, letra: 'D' }, { valor: 8, letra: 'S' }];
  
}

function newCard() {
  const novaCarta = randomCard(); //gera um número de carta random de 1 a 13
  let naipe = tipoCarta(novaCarta, cartasJogador.value); //obtem a repetição da carta nas cartas do jogador

  //com base na repetição da carta, obtem o naipe 
  switch (naipe) {
    case 0:
      naipe = 'C'
      break;
    case 1:
      naipe = 'D'
      break;
    case 2:
      naipe = 'H'
      break;
    case 3:
      naipe = 'S'
      break;
  }

  cartasJogador.value.push({ valor: novaCarta, letra: naipe });  //add a nova carta ao array (mão do jogador)
  pontosJogador.value += novaCarta //renderiza total de cartas em tela
  jogadasRestante.value -= 1 //reduz jogadas restantes
}

//função para verificar qtd de vezes em que determina carta se repete na mão do jogador
function tipoCarta(numCarta, array) {
  let resultado = 0;

  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].valor == numCarta) {
        resultado++
      }
    }
  } else {
    return 0
  }
  return resultado
}

//função para gerar carta aleatória ao jogador
function randomCard() {
  return Math.floor(Math.random() * 13 + 1)
}

//função para renderizar dinamicamente carta .svg em tela
function getImg(pic) {
  return new URL(`./icons/${pic.valor + pic.letra}.svg`, import.meta.url).href
}

//função para finalização do jogo, considerando a vitória/derrota do jogador
function encerrarJogo(result) {
  if (result === 'lose' || pontosJogador.value > 21) {
    jogadasRestante.value = 0;
    status.value = 'Que pena! Você perdeu!';
    classeStatus.value = 'text-white bg-danger rounded ms-2 p-2'
  } else if (pontosJogador.value > pontosAdversario.value) {
    jogadasRestante.value = 0;
    status.value = 'Parabéns! Você ganhou o jogo!';
    classeStatus.value = 'text-white bg-success rounded ms-2 p-2'
  }

}

//eventos watchers para verificação da pontuação e jogadas restantes
watch(pontosJogador, (novoValor) => {
  if (novoValor > 21) {
    encerrarJogo('lose')
  }
})
watch(jogadasRestante, async (novoValor) => {
  if (novoValor === 0) {
    let resultado = await encerrarJogo('verificar')
  }
})

</script>

<template>

  <div class="container main" role="main">

    <section class="row">
      <div class="col-md-8">
        <h1 class="p-2 text-center bg-dark text-light">Blackjack</h1>

        <button class="btn btn-primary p-2" @click="novoJogo">Novo jogo</button>
        <span type="text" v-text="status" v-show="status" :class="classeStatus"></span>
        <div class="row">
          <p class="col-6 mt-3">
            Jogadas restantes: <span v-text="jogadasRestante" class=""></span>
          </p>
        </div>

        <hr />
        <div class="row">
          <div class="col-6">
            <p>Adversário: <span v-text="pontosAdversario" class=""></span></p>
          </div>
          <div class="col-6 mb-2">
            <div class="card h-100 d-flex flex-row ">

              <img type="image" v-for="(carta, index) in cartasAdversario" :key="index" :src="getImg(carta)" alt=""
                width="50" />

            </div>
          </div>
        </div>

        <hr>
        <div class="row">
          <div class="col-6">
            <p>Jogador: <span v-text="pontosJogador" class=""></span></p>
            <h2>Carta: <span v-text="cartaRandom"></span></h2>
          </div>
          <div class="col-6 mb-2">
            <div class="card h-100 d-flex flex-row ">

              <img type="image" v-for="(carta, index) in cartasJogador" :key="index" :src="getImg(carta)" alt=""
                width="50" />

            </div>
          </div>
        </div>
        <hr />

        <div class="mb-2">
          <button class="btn btn-success" @click="newCard" v-show="jogadasRestante > 0">Nova carta</button>
          <button class="btn btn-primary ms-2" @click="encerrarJogo('verificar')"
            v-show="jogadasRestante > 0">Parar</button>
        </div>
      </div>
      <aside class="col-md-4">
        <div>
          <img id="img1" src="./icons/12C.svg" alt="" width="150">
          <img id="img2" src="./icons/13H.svg" alt="" width="150">
        </div>
      </aside>
    </section>

  </div>
</template>

<style>
.main {
  max-width: 830px;
}

aside {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}

#img2 {
  position: relative;
  top: -180px;
  left: 15px;

}

@media screen and (max-width: 800px) {
  aside img {
    display: none;
  }
}
</style>

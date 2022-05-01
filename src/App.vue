<script setup>
import { ref } from "vue";

const status = ref("");
const pontosAdversario = ref(0);
const pontosJogador = ref(0);
const jogadasRestante = ref(0);
const cartaRandom = ref(0);
const cartasJogador = ref([]);
const cartasAdversario = ref([]);
const resultado = ref(0);


function novoJogo() {
  status.value = 'Você está jogando';
  pontosJogador.value = 0;
  pontosAdversario.value = 17;
  jogadasRestante.value = 5;
  cartaRandom.value = 0;
  cartasJogador.value = [];
  cartasAdversario.value = [{valor: 4, letra: 'C'}, {valor: 5, letra:'D'}, {valor: 8, letra:'S'}];
}

function newCard() {
  const novaCarta = randomCard();
  let naipe = tipoCarta(novaCarta, cartasJogador.value);

  switch(naipe) {
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

  cartasJogador.value.push({valor: novaCarta, letra: naipe});
}

function tipoCarta(numCarta, array){
  console.log(array, numCarta);
    if(array.length > 0){
     
    
    } else {
      return 0
    }
    console.log(resultado)
    return resultado
}

function randomCard() {
  return Math.floor(Math.random() * 13 + 1)
}

function getImg(pic) {
  return new URL(`./icons/${pic.valor + pic.letra}.svg`, import.meta.url).href
}

</script>

<template>

  <div class="container main" role="main">

    <section class="row">
      <div class="col-md-8">
        <h1 class="p-2 text-center bg-dark text-light">Blackjack</h1>

        <button class="btn btn-primary p-2" @click="novoJogo">Novo jogo</button>
        <span type="text" v-text="status" v-show="status" class=" mt-2 p-2 text-success rounded"></span>
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
          <button class="btn btn-success" @click="newCard">Nova carta</button>
          <button class="btn btn-primary ms-2">Parar</button>
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

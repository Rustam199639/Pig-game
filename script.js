'use strict';

//Selecting elements
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
//let currentPlayer = currentEl0;

//Starting conditions
let isPlaying = true;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const displayCurScore = (id, score) => {
  document.getElementById(`current--${id}`).textContent = score;
};
const switchPlayer = () => {
  currentScore = 0;
  displayCurScore(activePlayer, currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1. Genetrating a random dice roll
    let randomNumBetween1and6 = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumBetween1and6}.png`;
    //3. If 1 so score a zero
    if (randomNumBetween1and6 != 1) {
      currentScore += randomNumBetween1and6;
      //currentPlayer.textContent = currentScore;
      displayCurScore(activePlayer, currentScore);
    } else {
      //else current player get 0 points, and we switch to another player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //adding scores to current
    scores[activePlayer] += currentScore;
    //display them
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //chek for winner
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  isPlaying = true;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  diceEl.classList.remove('hidden');
  debugger;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.getElementById(`score--${i}`).textContent = 0;
  }
  activePlayer = 0;
});

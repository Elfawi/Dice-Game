'use strict';

// variables to manage html elements

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnTutorials = document.querySelector('.btn--tutorials');
const btnCloseTutorials = document.querySelector('.btn-close-turorials');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winTimesEl = document.querySelectorAll('.win-times');
const tutorialsBoxEl = document.querySelector('.tutorials-box');

const mainContainerEl = document.querySelector('main');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// initial variables

let currentScore,
  playing,
  activePlayer,
  scores,
  player0WinTimes = 0,
  player1WinTimes = 0;
winTimesEl.textContent = 0;

// method to init the game

const init = function () {
  closeTutorials();
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  resetBothCurrentScore();
  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('show-winner');
  document.querySelector(`.player--1`).classList.remove('show-winner');
  diceEl.classList.remove('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// method to reset Current score for both players

const resetBothCurrentScore = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
};

// method to switch players

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// method to show the winner

const showWinner = function () {
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('show-winner');
};

// init the game 😄

init();

// event on roll btn

btnRoll.addEventListener('click', function () {
  if (playing) {
    const randomDice = Math.ceil(Math.random() * 6);
    diceEl.classList.remove('hidden');
    // diceEl.setAttribute('src', `dice-${randomDice}.png`); // another way
    diceEl.src = `dice-${randomDice}.png`;
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// event on hold btn

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      showWinner();
      playing = false;
      if (activePlayer === 0) {
        player0WinTimes++;
        winTimesEl[activePlayer].textContent = player0WinTimes;
      }
      if (activePlayer === 1) {
        player1WinTimes++;
        winTimesEl[activePlayer].textContent = player1WinTimes;
      }
    } else {
      switchPlayer();
    }
  }
});

// event on new btn

btnNew.addEventListener('click', init);

function closeTutorials() {
  tutorialsBoxEl.classList.add('hidden-tutorials');
}

btnTutorials.addEventListener('click', function () {
  tutorialsBoxEl.classList.toggle('hidden-tutorials');
});
btnCloseTutorials.addEventListener('click', closeTutorials);

document.addEventListener('keydown', function (event) {
  if (
    event.key === 'Escape' &&
    !tutorialsBoxEl.classList.contains('hidden-tutorials')
  ) {
    closeTutorials();
  }
});
window.addEventListener('click', function (e) {
  if (
    e.target === player0El ||
    e.target === player1El ||
    e.target === this.document.body
  ) {
    closeTutorials();
  }
});

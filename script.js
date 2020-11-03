'use strict';

// Selecting elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const player0El = document.querySelector(`.player--0`)
const player1El = document.querySelector(`.player--1`)

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

let scores = [0, 0];
let currScore = 0;
let currPlayer = 0
const winScore = 100;
let winner = false;

const changePlayer = function() {
    if(currPlayer){
        currPlayer = 0;
    } 
    else {
        currPlayer = 1;
        
    }
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`)

}

// Rolling dice functionality
btnRoll.addEventListener(`click`, function() {
    const dice = Math.trunc(Math.random() * 6) +1;
    diceEl.classList.remove (`hidden`);
    diceEl.src = `dice-${dice}.png`

    if(dice !== 1) {
        currScore += dice;
        document.getElementById(`current--${currPlayer}`).textContent = currScore;
    }else {
        document.getElementById(`current--${currPlayer}`).textContent = 0;
        currScore = 0;

        changePlayer();
    }
})
// Button hold Functionality
btnHold.addEventListener(`click`, function() {
    scores[currPlayer] += currScore;
    document.querySelector(`#score--${currPlayer}`).textContent = scores[currPlayer];
    currScore = 0;
    document.getElementById(`current--${currPlayer}`).textContent = 0;
    if(scores[currPlayer] >= winScore) {
        document.querySelector(`.player--${currPlayer}`).classList.toggle(`player--winner`)
        diceEl.classList.add(`hidden`);
        btnHold.classList.add(`hidden`);
        btnRoll.classList.add(`hidden`);
        winner = true;
    }else {
        changePlayer();
    }
})

// New Game Button functionality
btnNew.addEventListener(`click`, function() {
    if(winner ===true) {
        document.querySelector(`.player--${currPlayer}`).classList.toggle(`player--winner`)
        winner = false;
    }
    scores = [0, 0];
    currScore = 0;
    currPlayer = 0
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0
    current1El.textContent = 0
    diceEl.classList.add(`hidden`);
    btnHold.classList.remove(`hidden`);
    btnRoll.classList.remove(`hidden`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);

});

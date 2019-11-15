const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
};

// Play Game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computer's decision
function getComputerChoice() {
  const rand = Math.random();
  let decision = '';
  if (rand < 0.34) {
    decision = 'rock';
  } else if (rand <= 0.67) {
    decision = 'paper';
  } else {
    decision = 'scissors';
  }
  return decision;
}

// Get the game winner
function getWinner(p, c) {
  let outcome = '';
  if (p === c) {
    outcome = 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      outcome = 'computer';
    } else {
      outcome = 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      outcome = 'computer';
    } else {
      outcome = 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      outcome = 'computer';
    } else {
      outcome = 'player';
    }
  }
  return outcome;
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Increment the player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
    <h1 class="text-win">You Won!</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"><i/>
    <p>The computer chose <strong>${computerChoice}</strong></p>
    `;
  } else if (winner === 'computer') {
    // Increment the computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
    <h1 class="text-lose">You Lost :(</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"><i/>
    <p>The computer chose <strong>${computerChoice}</strong></p>
    `;
  } else {
    result.innerHTML = `
    <h1>It's A Draw!</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"><i/>
    <p>The computer chose <strong>${computerChoice}</strong></p>
    `;
  }

  // Show the score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

  modal.style.display = 'block';
}

function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

// Clear the modal view
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);

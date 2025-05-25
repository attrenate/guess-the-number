// Generate random number between 1 and 20
let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// DOM elements
const checkBtn = document.getElementById('check-btn');
const againBtn = document.querySelector('.btn');
const guessInput = document.getElementById('check');
const message = document.querySelector('.message') || createMessageElement();
const scoreDisplay = document.querySelectorAll('.h2-p')[0];
const highscoreDisplay = document.querySelectorAll('.h2-p')[1];


function createMessageElement() {
    const msg = document.createElement('p');
    msg.classList.add('message');
    msg.textContent = 'Start guessing...';
    document.querySelector('.num-container').prepend(msg);
    return msg;
}


function setMessage(text) {
    message.textContent = text;
}


function revealSecretNumber() {
    let display = document.createElement('p');
    display.id = 'secret-number';
    display.textContent = `Secret number was: ${secretNumber}`;
    display.style.color = 'gold';
    display.style.fontSize = '1.5rem';
    document.querySelector('.num-container').appendChild(display);
}


function endGame() {
    checkBtn.disabled = true;
    guessInput.disabled = true;
}


function enableGame() {
    checkBtn.disabled = false;
    guessInput.disabled = false;
}


againBtn.addEventListener('click', () => {
    score = 20;
    secretNumber = Math.floor(Math.random() * 20) + 1;
    setMessage('Start guessing...');
    scoreDisplay.textContent = `Score: ${score}`;
    guessInput.value = '';
    document.body.style.backgroundColor = ''; 
    const oldSecret = document.getElementById('secret-number');
    if (oldSecret) oldSecret.remove();
    enableGame();
});


function handleGuess() {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 20) {
        setMessage('⛔ Enter a number between 1 and 20!');
        return;
    }

   
    if (guess === secretNumber) {
        setMessage('🎉 Correct Number!');
        document.body.style.backgroundColor = '#60b347'; // Green background
        revealSecretNumber();
        if (score > highscore) {
            highscore = score;
            highscoreDisplay.textContent = `Highescore: ${highscore}`;
        }
        endGame();
    } else {
        // Wrong Guess
        if (score > 1) {
            setMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
            score--;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            setMessage('💥 You lost the game!');
            scoreDisplay.textContent = 'Score: 0';
            revealSecretNumber();
            endGame(); 
        }
    }
}


checkBtn.addEventListener('click', handleGuess);


guessInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

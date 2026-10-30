const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverScreen = document.querySelector('.game-over-screen');
const scoreValue = document.querySelector('#score-value');

let isGameOver = false;
let score = 0;
let hasPassedPipe = false;

const jump = (event) => {
    if (isGameOver) {
        if (event && (event.code === 'Space' || event.code === 'Enter')) {
            restartGame();
        }
        return;
    }

    if (event && event.code === 'Space') {
        event.preventDefault();
    }

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        isGameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        gameOverScreen.style.display = 'flex';

        clearInterval(loop);
        return;
    }

    if (pipePosition < 0 && !hasPassedPipe && !isGameOver) {
        score += 50;
        scoreValue.textContent = score;
        hasPassedPipe = true;
    }

    if (pipePosition > 200) {
        hasPassedPipe = false;
    }

}, 10);

const restartGame = () => {
    location.reload();
}

document.addEventListener('keydown', jump);
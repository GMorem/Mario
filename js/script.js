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
    const pipeRight = +window.getComputedStyle(pipe).right.replace('px', '');
    const marioBottom = +window.getComputedStyle(mario).bottom.pxToNum ? parseInt(window.getComputedStyle(mario).bottom) : +window.getComputedStyle(mario).bottom.replace('px', '');

    // Condição de colisão ajustada para propriedades right/bottom
    // O cano está posicionado à esquerda em cerca de (window.innerWidth - pipeRight - larguraDoCano)
    const boardWidth = document.querySelector('.game-board').offsetWidth;
    const pipeLeft = boardWidth - pipeRight - 80; 

    const marioPositionLeft = 50; // Definido no CSS (.mario { left: 50px; })

    // Detetar colisão (cano na mesma faixa horizontal do Mário e Mário no chão)
    if (pipeRight >= (boardWidth - 130) && pipeRight <= (boardWidth - 50) && marioBottom < 80) {
        isGameOver = true;

        pipe.style.animation = 'none';
        pipe.style.right = `${pipeRight}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioBottom}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        gameOverScreen.style.display = 'flex';

        clearInterval(loop);
        return;
    }

    // Sistema de Pontuação
    if (pipeRight > boardWidth && !hasPassedPipe && !isGameOver) {
        score += 50;
        scoreValue.textContent = score;
        hasPassedPipe = true;
    }

    if (pipeRight < boardWidth - 300) {
        hasPassedPipe = false;
    }

}, 10);

const restartGame = () => {
    location.reload();
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump(e);
    }
});

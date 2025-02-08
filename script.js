const cells = document.querySelectorAll('.cells');
const score_pc = document.getElementById('score_pc');
const score_user = document.getElementById('score_user');
let markedCells = 0;

let board = [0, 0, 0,
    0, 0, 0,
    0, 0, 0];

let pc_score = 0;
let user_score = 0;
let draws = 0;

let win = 0;
let running = false;

const updateScores = () => {
    score_pc.innerHTML = pc_score;
    score_user.innerHTML = user_score;
    score_draws.innerHTML = draws;
}

const addPoints = (pcOrUser) => {
    let who = pcOrUser;
    win++;
    if (who == 'pc') {
        pc_score++;
    }
    if (who == 'user') {
        user_score++;
    }
    updateScores();
}

const marcarCelda = async (event) => {
    let target = event.target.id;

    let nroCelda = target.slice(5, 6) - 1;

    if (cells[nroCelda].innerHTML != '') {
        alert('Try again.');

    } else {
        jugadaJugador(nroCelda);

        console.log(win)
        if (win === 0) {
            jugadaPC();
        }
    }
};

// PC/Player Turns
const jugadaJugador = (nroCelda) => {
    if (nroCelda == 0 || nroCelda == 1 || nroCelda == 2 || nroCelda == 3 || nroCelda == 4 || nroCelda == 5 || nroCelda == 6 || nroCelda == 7 || nroCelda == 8) {
        cells[nroCelda].innerHTML = 'x';
        cells[nroCelda].style.color = 'var(--red)';
        board[nroCelda] = 1;
    }
    markedCells++;
    calculateScore('player');
}

const jugadaPC = () => {
    nroAleatorio = Math.floor(Math.random() * 8) + 1;
    var count = 0;

    while (cells[nroAleatorio].innerHTML != '' && count < 8) {
        nroAleatorio = Math.floor(Math.random() * 8) + 1;
        count++;
    }

    if (cells[nroAleatorio].innerHTML == '') {

        if (nroAleatorio == 0 || nroAleatorio == 1 || nroAleatorio == 2 || nroAleatorio == 3 || nroAleatorio == 4 || nroAleatorio == 5 || nroAleatorio == 6 || nroAleatorio == 7 || nroAleatorio == 8) {
            cells[nroAleatorio].innerHTML = 'o';
            cells[nroAleatorio].style.color = 'var(--blue)'
            board[nroAleatorio] = 2;
        }
        markedCells++;
    }
    if (markedCells == 9 & win == 0) {
        alert('empate');
        draws++;
    }
    calculateScore('pc');
}

// Calculate Score 
function calculateScore(turn) {

    if (turn == 'pc') {
        // PC gana si...
        // 4 casos board[4]
        if (board[4] == 2) {
            if (board[0] == 2 & board[8] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
            if (board[3] == 2 & board[5] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
            if (board[2] == 2 & board[6] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
            if (board[1] == 2 & board[7] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
        }

        // 2 casos board[0]
        if (board[0] == 2) {
            if (board[3] == 2 & board[6] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
            if (board[1] == 2 & board[2] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
        }

        // 2 casos board[8]
        if (board[8] == 2) {
            if (board[2] == 2 & board[5] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
            if (board[6] == 2 & board[7] == 2) {
                alert('PC wins.');
                addPoints('pc');
                disableGame();
            }
        }
    }

    if (turn == 'player') {
        // Jugador gana si...
        // 4 casos board[4]
        if (board[4] == 1) {
            if (board[0] == 1 & board[8] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
            if (board[3] == 1 & board[5] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
            if (board[2] == 1 & board[6] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
            if (board[1] == 1 & board[7] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
        }

        // 2 casos board[0]
        if (board[0] == 1) {
            if (board[3] == 1 & board[6] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
            if (board[1] == 1 & board[2] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
        }

        // 2 casos board[8]
        if (board[8] == 1) {
            if (board[2] == 1 & board[5] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
            if (board[6] == 1 & board[7] == 1) {
                alert('You win.');
                addPoints('user');
                disableGame();
            }
        }
    }
}

cells[0].addEventListener('click', marcarCelda);
cells[1].addEventListener('click', marcarCelda);
cells[2].addEventListener('click', marcarCelda);

cells[3].addEventListener('click', marcarCelda);
cells[4].addEventListener('click', marcarCelda);
cells[5].addEventListener('click', marcarCelda);

cells[6].addEventListener('click', marcarCelda);
cells[7].addEventListener('click', marcarCelda);
cells[8].addEventListener('click', marcarCelda);

/* Restart game */
const restart = document.getElementById('btnRestart')

function restartGame() {
    win = 0;
    markedCells = 0;
    running = true;

    for (i = 0; i <= cells.length - 1; i++) {
        cells[i].innerHTML = '';
        cells[i].removeAttribute('class', 'disabled_cell');
    }
    for (i = 0; i <= cells.length; i++) {
        board[i] = '';
    }
}

/* Disable cells */
const disableGame = () => {
    running = false;
    for (i = 0; i < cells.length; i++) {
        cells[i].setAttribute('class', 'disabled_cell');
    }
}

restart.addEventListener('click', restartGame);
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');
  
  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    checkWinner();
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      highlightWinningCells(a, b, c);
      setTimeout(() => {
        alert(`¡Jugador ${currentPlayer} gana!`);
        resetBoard();
      }, 100);
      return;
    }
  }

  const isDraw = [...cells].every(cell => cell.textContent !== '');
  if (isDraw) {
    setTimeout(() => {
      alert('¡Empate!');
      cells.forEach(cell => {
        cell.classList.add('draw');
      });
      resetBoard();
    }, 100);
  }
}

function highlightWinningCells(a, b, c) {
  cells[a].classList.add('win');
  cells[b].classList.add('win');
  cells[c].classList.add('win');
  highlightWinningLine(a, b, c);
}

function highlightWinningLine(a, b, c) {
  const line = document.createElement('div');
  line.classList.add('line');
  if (a === 0 && c === 2) {
    line.style.transform = 'rotate(-45deg)';
  } else if (a === 2 && c === 0) {
    line.style.transform = 'rotate(45deg)';
  } else if (a === 3 && c === 5) {
    line.style.transform = 'rotate(0deg)';
  } else if (a === 1 && c === 7) {
    line.style.transform = 'rotate(90deg)';
  }
  cells[a].appendChild(line);
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('o', 'x', 'win', 'draw');
    const line = cell.querySelector('.line');
    if (line) {
      cell.removeChild(line);
    }
  });
  currentPlayer = 'X';
}

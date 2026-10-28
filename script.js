'use strict';

// ------------------------------------------------------------
// Page elements and in-memory game state
// ------------------------------------------------------------
const boardElement = document.getElementById('board');
const countElement = document.getElementById('count');
const statusElement = document.getElementById('status');
const toastElement = document.getElementById('toast');

let items = [];
let squares = [];
let marked = new Set();
let toastTimeout;

const BOARD_SIZE = 5;
const FREE_SPACE_INDEX = 12;
const REQUIRED_ENTRIES = 24;

// ------------------------------------------------------------
// All possible winning rows, columns, and diagonals
// ------------------------------------------------------------
const winningLines = [];

for (let row = 0; row < BOARD_SIZE; row++) {
    winningLines.push(
        Array.from({ length: BOARD_SIZE }, (_, col) => row * BOARD_SIZE + col)
    );
}

for (let col = 0; col < BOARD_SIZE; col++) {
    winningLines.push(
        Array.from({ length: BOARD_SIZE }, (_, row) => row * BOARD_SIZE + col)
    );
}

winningLines.push(
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
);

// Return a shuffled copy without modifying the original list.
function shuffle(values) {
    const result = [...values];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

// Show a brief message for actions like generating a new card.
function notify(message) {
    clearTimeout(toastTimeout);
    toastElement.textContent = message;
    toastElement.classList.add('show');

    toastTimeout = setTimeout(() => {
        toastElement.classList.remove('show');
    }, 2400);
}

// Refresh the square styles, counter, and completed-line highlights.
function updateBoard() {
    countElement.textContent = String(marked.size).padStart(2, '0');

    const completedLines = winningLines.filter(line =>
        line.every(index => marked.has(index))
    );
    const winningCells = new Set(completedLines.flat());

    boardElement.querySelectorAll('.cell').forEach((button, index) => {
        const selected = marked.has(index);
        button.classList.toggle('selected', selected);
        button.classList.toggle('winner', winningCells.has(index));
        button.setAttribute('aria-pressed', String(selected));
    });

    const total = completedLines.length;
    statusElement.textContent = total
        ? `${total} completed line${total === 1 ? '' : 's'} highlighted.`
        : 'Complete a row, column, or diagonal to highlight it.';
}

// Toggle a square on or off. The center FREE SPACE cannot change.
function toggleSquare(index) {
    if (index === FREE_SPACE_INDEX) return;

    if (marked.has(index)) {
        marked.delete(index);
    } else {
        marked.add(index);
    }

    updateBoard();
}

// Pick 24 random entries and build a new 5x5 board.
function createBoard() {
    if (items.length < REQUIRED_ENTRIES) {
        statusElement.textContent = 'Add at least 24 unique entries to bingo_list.json.';
        return;
    }

    const picks = shuffle(items).slice(0, REQUIRED_ENTRIES);
    squares = [
        ...picks.slice(0, FREE_SPACE_INDEX),
        'FREE SPACE',
        ...picks.slice(FREE_SPACE_INDEX)
    ];

    marked = new Set([FREE_SPACE_INDEX]);
    boardElement.replaceChildren();

    squares.forEach((label, index) => {
        const isFree = index === FREE_SPACE_INDEX;
        const button = document.createElement('button');

        button.type = 'button';
        button.className = `cell${isFree ? ' free' : ''}`;
        button.textContent = label;
        button.setAttribute(
            'aria-label',
            `${label}, row ${Math.floor(index / BOARD_SIZE) + 1}, column ${index % BOARD_SIZE + 1}`
        );

        if (isFree) {
            button.disabled = true;
            button.setAttribute('aria-pressed', 'true');
        }

        button.addEventListener('click', () => toggleSquare(index));
        boardElement.append(button);
    });

    updateBoard();
}

// ------------------------------------------------------------
// Button actions
// ------------------------------------------------------------
document.getElementById('new').addEventListener('click', () => {
    createBoard();
    notify('NEW BOARD GENERATED');
});

document.getElementById('clear').addEventListener('click', () => {
    marked = new Set([FREE_SPACE_INDEX]);
    updateBoard();
    notify('MARKS CLEARED');
});

// ------------------------------------------------------------
// Load bingo_list.json when the page opens.
// Nothing is stored in cookies, localStorage, or a database.
// ------------------------------------------------------------
async function start() {
    try {
        const response = await fetch('./bingo_list.json', { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Could not load bingo_list.json');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('JSON must contain an array of strings');
        }

        items = [...new Set(
            data
                .filter(value => typeof value === 'string')
                .map(value => value.trim())
                .filter(Boolean)
                .filter(value => value.toUpperCase() !== 'FREE SPACE')
        )];

        if (items.length < REQUIRED_ENTRIES) {
            throw new Error('At least 24 unique entries are required');
        }

        createBoard();
    } catch (error) {
        statusElement.textContent = error.message;
        boardElement.textContent = 'Unable to load bingo list. See README.md for setup.';
        console.error(error);
    }
}

start();

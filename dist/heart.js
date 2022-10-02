"use strict";
const rand = () => Math.round(Math.random() * 3);
const getBestScore = () => {
    const data = localStorage.getItem("bestScore");
    if (!data) {
        localStorage.setItem("bestScore", "0");
        bestBoard.innerText = "0";
        return 0;
    }
    bestBoard.innerText = data;
    return parseInt(data);
};
const createCoords = () => {
    const elementCoords = [[], [], [], []];
    let rowIndex = 0;
    let colIndex = 0;
    boxes.forEach((box) => {
        if (colIndex === 4) {
            rowIndex++;
            colIndex = 0;
        }
        elementCoords[rowIndex].push({
            x: box.offsetLeft,
            y: box.offsetTop,
        });
        colIndex++;
    });
    return elementCoords;
};
const checkIfCanMove = () => {
    let numOfTakenTiles = 0;
    let canMove = false;
    for (let row = 0; row < tiles.length; row++) {
        let prevValue = 0;
        for (let col = 0; col < tiles[row].length; col++) {
            const currTile = tiles[row][col];
            const tileAhead = !tiles[row + 1]
                ? null
                : tiles[row + 1][col];
            if (!currTile)
                continue;
            if (currTile.value === prevValue)
                canMove = true;
            if (tileAhead && currTile.value === tileAhead.value)
                canMove = true;
            numOfTakenTiles++;
            prevValue = currTile.value;
        }
    }
    if (numOfTakenTiles >= 16 && !canMove) {
        return false;
    }
    return true;
};
const drawTile = (r, c, v) => {
    const coords = tileCoords[r][c];
    const placement = gridPos[r][c];
    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    tiles[r][c] = new Tile(newTile, themeColour, placement, coords, v);
    container.appendChild(newTile);
    tiles[r][c];
};
const setTile = () => {
    let row = rand();
    let col = rand();
    let count = rand();
    let takenTiles = [];
    let tileNotAvailable = tiles[row][col] !== null;
    const percentage = Math.round(Math.random() * 10) / 10;
    const twoOrFour = percentage < 1 ? 2 : 4;
    while (tileNotAvailable) {
        if (count >= 16)
            return;
        if (!takenTiles.includes(`${row}${col}`)) {
            takenTiles.push(`${row}${col}`);
            count++;
        }
        row = rand();
        col = rand();
        tileNotAvailable = tiles[row][col] !== null;
    }
    drawTile(row, col, twoOrFour);
    if (!checkIfCanMove()) {
        gameOverScreen.style.display = "flex";
        return;
    }
};
const spawn = () => {
    setTimeout(() => {
        setTile();
    }, 150);
};
const removeTile = (deleteTile, movedTile) => {
    setTimeout(() => {
        deleteTile.box.remove();
        movedTile.box.style.zIndex = "0";
    }, 100);
};
const checkScore = (s) => {
    if (s === 2048 && !reachedWin) {
        gameStart = false;
        winScreen.style.display = "flex";
        reachedWin = true;
    }
};
const continueGame = () => {
    winScreen.style.display = "none";
    gameStart = true;
    setupInput();
};
const playAgain = () => location.reload();
window.addEventListener("resize", () => {
    tileCoords = createCoords();
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const currTile = tiles[y][x];
            const newCoords = tileCoords[y][x];
            if (!currTile)
                continue;
            currTile.coords = newCoords;
        }
    }
});
const start = () => {
    tileCoords = createCoords();
    bestScore = getBestScore();
    setTile();
    setTile();
};
window.onload = start;

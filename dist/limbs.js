"use strict";
const moving = (box) => {
    box.classList.add("moving");
};
const idle = (box) => {
    setTimeout(() => {
        box.classList.remove("moving");
    }, 100);
};
const moveUp = () => {
    for (let y = 1; y < tiles.length; y++) {
        const currRow = tiles[y];
        const rowAhead = tiles[y - 1];
        for (let x = 0; x < currRow.length; x++) {
            let currTile = currRow[x];
            let tileAhead = rowAhead[x];
            let index = 1;
            while (tileAhead === null && currTile !== null) {
                if (y - index < 0)
                    break;
                if ((y - index === 0 && tiles[y - index][x] !== null) ||
                    tiles[y - index][x] !== null)
                    break;
                const gridPosition = gridPos[y - index][x];
                const coordsToJumpTo = tileCoords[y - index][x];
                moving(currTile.box);
                currTile.coords = coordsToJumpTo;
                currTile.placement = gridPosition;
                tiles[y - index][x] = currTile;
                tiles[y - (index - 1)][x] = null;
                index++;
                numOfMovements++;
                idle(currTile.box);
            }
        }
    }
};
const upCombineCheck = () => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow = tiles[y];
        const prevRow = tiles[y + 1];
        if (!prevRow)
            break;
        for (let x = 0; x < currRow.length; x++) {
            let currTile = currRow[x];
            let prevTile = prevRow[x];
            if (currTile === null || prevTile === null)
                continue;
            if (currTile.value !== prevTile.value)
                continue;
            const gridPosition = gridPos[y][x];
            const coordsToJumpTo = tileCoords[y][x];
            moving(prevTile.box);
            prevTile.box.style.zIndex = "99";
            prevTile.coords = coordsToJumpTo;
            prevTile.placement = gridPosition;
            prevTile.value = prevTile.value * 2;
            checkScore(prevTile.value);
            tiles[y][x] = prevTile;
            tiles[y + 1][x] = null;
            removeTile(currTile, prevTile);
            numOfMovements++;
            score += prevTile.value;
            idle(prevTile.box);
        }
        moveUp();
    }
};
const moveDown = () => {
    for (let y = tiles.length - 2; y > -1; y--) {
        const currRow = tiles[y];
        const rowAhead = tiles[y + 1];
        for (let x = 0; x < currRow.length; x++) {
            const currTile = currRow[x];
            const tileAhead = rowAhead[x];
            let index = 1;
            while (tileAhead === null && currTile !== null) {
                if (y + index > 3)
                    break;
                if ((y + index === 3 && tiles[y + index][x] !== null) ||
                    tiles[y + index][x] !== null)
                    break;
                const gridPosition = gridPos[y + index][x];
                const coordsToJumpTo = tileCoords[y + index][x];
                moving(currTile.box);
                currTile.coords = coordsToJumpTo;
                currTile.placement = gridPosition;
                tiles[y + index][x] = currTile;
                tiles[y + (index - 1)][x] = null;
                index++;
                numOfMovements++;
                idle(currTile.box);
            }
        }
    }
};
const downCombineCheck = () => {
    for (let y = tiles.length - 1; y > -1; y--) {
        const currRow = tiles[y];
        const prevRow = tiles[y - 1];
        if (!prevRow)
            break;
        for (let x = 0; x < currRow.length; x++) {
            let currTile = currRow[x];
            let prevTile = prevRow[x];
            if (currTile === null || prevTile === null)
                continue;
            if (currTile.value !== prevTile.value)
                continue;
            const gridPosition = gridPos[y][x];
            const coordsToJumpTo = tileCoords[y][x];
            moving(prevTile.box);
            prevTile.box.style.zIndex = "99";
            prevTile.coords = coordsToJumpTo;
            prevTile.placement = gridPosition;
            prevTile.value = prevTile.value * 2;
            checkScore(prevTile.value);
            tiles[y][x] = prevTile;
            tiles[y - 1][x] = null;
            removeTile(currTile, prevTile);
            numOfMovements++;
            score += prevTile.value;
            idle(prevTile.box);
        }
        moveDown();
    }
};
const moveLeft = () => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow = tiles[y];
        for (let x = 1; x < currRow.length; x++) {
            const currTile = currRow[x];
            const tileAhead = currRow[x - 1];
            let index = 1;
            while (tileAhead === null && currTile !== null) {
                if (x - index < 0)
                    break;
                if ((x - index === 0 && tiles[y][x - index] !== null) ||
                    tiles[y][x - index] !== null)
                    break;
                const gridPosition = gridPos[y][x - index];
                const coordsToJumpTo = tileCoords[y][x - index];
                moving(currTile.box);
                currTile.coords = coordsToJumpTo;
                currTile.placement = gridPosition;
                tiles[y][x - index] = currTile;
                tiles[y][x - (index - 1)] = null;
                index++;
                numOfMovements++;
                idle(currTile.box);
            }
        }
    }
};
const leftCombineCheck = () => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow = tiles[y];
        for (let x = 0; x < currRow.length; x++) {
            const currTile = currRow[x];
            const prevTile = currRow[x + 1];
            if (!prevTile)
                break;
            if (currTile === null || prevTile === null)
                continue;
            if (currTile.value !== prevTile.value)
                continue;
            const gridPosition = gridPos[y][x];
            const coordsToJumpTo = tileCoords[y][x];
            moving(prevTile.box);
            prevTile.box.style.zIndex = "99";
            prevTile.coords = coordsToJumpTo;
            prevTile.placement = gridPosition;
            prevTile.value = prevTile.value * 2;
            checkScore(prevTile.value);
            tiles[y][x] = prevTile;
            tiles[y][x + 1] = null;
            removeTile(currTile, prevTile);
            numOfMovements++;
            score += prevTile.value;
            idle(prevTile.box);
        }
        moveLeft();
    }
};
const moveRight = () => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow = tiles[y];
        for (let x = currRow.length - 2; x > -1; x--) {
            const currTile = currRow[x];
            const tileAhead = currRow[x + 1];
            let index = 1;
            while (tileAhead === null && currTile !== null) {
                if (x + index > 3)
                    break;
                if ((x + index === 3 && tiles[y][x + index] !== null) ||
                    tiles[y][x + index] !== null)
                    break;
                const gridPosition = gridPos[y][x + index];
                const coordsToJumpTo = tileCoords[y][x + index];
                moving(currTile.box);
                currTile.coords = coordsToJumpTo;
                currTile.placement = gridPosition;
                tiles[y][x + index] = currTile;
                tiles[y][x + (index - 1)] = null;
                index++;
                numOfMovements++;
                idle(currTile.box);
            }
        }
    }
};
const rightCombineCheck = () => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow = tiles[y];
        for (let x = currRow.length - 1; x > -1; x--) {
            const currTile = currRow[x];
            const prevTile = currRow[x - 1];
            if (!prevTile)
                break;
            if (currTile === null || prevTile === null)
                continue;
            if (currTile.value !== prevTile.value)
                continue;
            const gridPosition = gridPos[y][x];
            const coordsToJumpTo = tileCoords[y][x];
            moving(prevTile.box);
            prevTile.box.style.zIndex = "99";
            prevTile.coords = coordsToJumpTo;
            prevTile.placement = gridPosition;
            prevTile.value = prevTile.value * 2;
            checkScore(prevTile.value);
            tiles[y][x] = prevTile;
            tiles[y][x - 1] = null;
            removeTile(currTile, prevTile);
            numOfMovements++;
            score += prevTile.value;
            idle(prevTile.box);
        }
        moveRight();
    }
};
const setupInput = () => {
    if (gameStart) {
        document.addEventListener("keydown", handleInput, { once: true });
    }
};
const handleInput = (e) => {
    const key = e.key;
    switch (key) {
        case "ArrowUp":
            moveUp();
            upCombineCheck();
            break;
        case "ArrowDown":
            moveDown();
            downCombineCheck();
            break;
        case "ArrowLeft":
            moveLeft();
            leftCombineCheck();
            break;
        case "ArrowRight":
            moveRight();
            rightCombineCheck();
            break;
        default:
            setupInput();
            return;
    }
    if (numOfMovements > 0) {
        spawn();
        numOfMovements = 0;
        scoreBoard.innerText = score.toString();
        if (score > bestScore) {
            bestBoard.innerText = score.toString();
            localStorage.setItem("bestScore", score.toString());
        }
    }
    setupInput();
};
setupInput();

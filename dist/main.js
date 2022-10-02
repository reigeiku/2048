"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tile_instances, _Tile_box, _Tile_theme, _Tile_value, _Tile_coords, _Tile_placement, _Tile_changeColour;
class Tile {
    constructor(box, theme, placement, coords, value) {
        _Tile_instances.add(this);
        _Tile_box.set(this, void 0);
        _Tile_theme.set(this, void 0);
        _Tile_value.set(this, 0);
        _Tile_coords.set(this, { y: 0, x: 0 });
        _Tile_placement.set(this, { y: 0, x: 0 });
        __classPrivateFieldSet(this, _Tile_box, box, "f");
        __classPrivateFieldSet(this, _Tile_theme, theme, "f");
        this.placement = placement;
        this.coords = coords;
        this.value = value;
        __classPrivateFieldGet(this, _Tile_instances, "m", _Tile_changeColour).call(this);
    }
    get box() {
        return __classPrivateFieldGet(this, _Tile_box, "f");
    }
    get placement() {
        return __classPrivateFieldGet(this, _Tile_placement, "f");
    }
    set placement(newPlacement) {
        __classPrivateFieldGet(this, _Tile_box, "f").style.gridRow = newPlacement.y.toString();
        __classPrivateFieldGet(this, _Tile_box, "f").style.gridColumn = newPlacement.x.toString();
        __classPrivateFieldSet(this, _Tile_placement, newPlacement, "f");
    }
    get coords() {
        return __classPrivateFieldGet(this, _Tile_coords, "f");
    }
    set coords(newCoords) {
        __classPrivateFieldGet(this, _Tile_box, "f").style.left = newCoords.x + "px";
        __classPrivateFieldGet(this, _Tile_box, "f").style.top = newCoords.y + "px";
        __classPrivateFieldSet(this, _Tile_coords, newCoords, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Tile_value, "f");
    }
    set value(newValue) {
        __classPrivateFieldGet(this, _Tile_box, "f").innerText = newValue.toString();
        __classPrivateFieldSet(this, _Tile_value, newValue, "f");
        __classPrivateFieldGet(this, _Tile_instances, "m", _Tile_changeColour).call(this);
    }
}
_Tile_box = new WeakMap(), _Tile_theme = new WeakMap(), _Tile_value = new WeakMap(), _Tile_coords = new WeakMap(), _Tile_placement = new WeakMap(), _Tile_instances = new WeakSet(), _Tile_changeColour = function _Tile_changeColour() {
    const keys = Object.keys(__classPrivateFieldGet(this, _Tile_theme, "f"));
    const values = Object.values(__classPrivateFieldGet(this, _Tile_theme, "f"));
    const key = __classPrivateFieldGet(this, _Tile_value, "f").toString();
    let color = "";
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === key)
            color = values[i];
    }
    __classPrivateFieldGet(this, _Tile_box, "f").style.backgroundColor = color;
};
const scoreBoard = document.getElementById("score-board");
const bestBoard = document.getElementById("best-score");
const container = document.getElementById("tile-box");
const boxes = document.querySelectorAll(".col");
const gameOverScreen = document.querySelectorAll(".gameover-screen")[0];
const winScreen = document.querySelectorAll(".win-screen")[0];
const themeColour = {
    2: "#cd6155",
    4: "#a569bd",
    8: "#5499c7",
    16: "#45b39d",
    32: "#52be80",
    64: "#f5b041",
    128: "#dc7633",
    256: "#cacfd2",
    512: "#99a3a4",
    1024: "#566573",
    2048: "#ec7063",
    4096: "#af7ac5",
    8192: "#5dade2",
    16384: "#48c9b0",
    32768: "#58d68d",
    65536: "#f4d03f",
    131072: "#eb984e",
    262144: "#f0f3f4",
    524288: "#aab7b8",
    1048576: "#5d6d7e",
};
let tiles = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];
let gridPos = [
    [
        { y: 1, x: 1 },
        { y: 1, x: 2 },
        { y: 1, x: 3 },
        { y: 1, x: 4 },
    ],
    [
        { y: 2, x: 1 },
        { y: 2, x: 2 },
        { y: 2, x: 3 },
        { y: 2, x: 4 },
    ],
    [
        { y: 3, x: 1 },
        { y: 3, x: 2 },
        { y: 3, x: 3 },
        { y: 3, x: 4 },
    ],
    [
        { y: 4, x: 1 },
        { y: 4, x: 2 },
        { y: 4, x: 3 },
        { y: 4, x: 4 },
    ],
];
let tileCoords;
let numOfMovements = 0;
let score = 0;
let bestScore;
let reachedWin = false;
let gameStart = true;
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

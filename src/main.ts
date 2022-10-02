type ThemeColour = {
    2: string;
    4: string;
    8: string;
    16: string;
    32: string;
    64: string;
    128: string;
    256: string;
    512: string;
    1024: string;
    2048: string;
    4096: string;
    8192: string;
    16384: string;
    32768: string;
    65536: string;
    131072: string;
    262144: string;
    524288: string;
    1048576: string;
};
type Coordinates = { y: number; x: number };
type TileElement = Tile | null;

const scoreBoard: HTMLElement = document.getElementById("score-board")!;
const bestBoard: HTMLElement = document.getElementById("best-score")!;
const container: HTMLElement = document.getElementById("tile-box")!;
const boxes: NodeListOf<Element> = document.querySelectorAll(".col")!;
const gameOverScreen: any = document.querySelectorAll(".gameover-screen")[0]!;
const winScreen: any = document.querySelectorAll(".win-screen")[0]!;

const themeColour: ThemeColour = {
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
let tiles: TileElement[][] = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];
let gridPos: Coordinates[][] = [
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
let tileCoords: Coordinates[][];
let numOfMovements: number = 0;
let score: number = 0;
let bestScore: number;
let reachedWin: boolean = false;
let gameStart: boolean = true;

class Tile {
    #box: HTMLElement;
    #theme: ThemeColour;
    #value: number = 0;
    #coords: Coordinates = { y: 0, x: 0 };
    #placement: Coordinates = { y: 0, x: 0 };

    constructor(
        box: HTMLElement,
        theme: ThemeColour,
        placement: Coordinates,
        coords: Coordinates,
        value: number
    ) {
        this.#box = box;
        this.#theme = theme;
        this.placement = placement;
        this.coords = coords;
        this.value = value;
        this.#changeColour();
    }

    get box(): HTMLElement {
        return this.#box;
    }

    get placement(): Coordinates {
        return this.#placement;
    }

    set placement(newPlacement: Coordinates) {
        this.#box.style.gridRow = newPlacement.y.toString();
        this.#box.style.gridColumn = newPlacement.x.toString();
        this.#placement = newPlacement;
    }

    get coords(): Coordinates {
        return this.#coords;
    }

    set coords(newCoords: Coordinates) {
        this.#box.style.left = newCoords.x + "px";
        this.#box.style.top = newCoords.y + "px";
        this.#coords = newCoords;
    }

    get value(): number {
        return this.#value;
    }

    set value(newValue: number) {
        this.#box.innerText = newValue.toString();
        this.#value = newValue;
        this.#changeColour();
    }

    #changeColour(): void {
        const keys: string[] = Object.keys(this.#theme);
        const values: string[] = Object.values(this.#theme);
        const key: string = this.#value.toString();
        let color: string = "";

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === key) color = values[i];
        }

        this.#box.style.backgroundColor = color;
    }
}

const rand = (): number => Math.round(Math.random() * 3);

const getBestScore = (): number => {
    const data: string | null = localStorage.getItem("bestScore");
    if (!data) {
        localStorage.setItem("bestScore", "0");
        bestBoard.innerText = "0";
        return 0;
    }
    bestBoard.innerText = data;
    return parseInt(data);
};

const createCoords = (): Coordinates[][] => {
    const elementCoords: Coordinates[][] = [[], [], [], []];
    let rowIndex = 0;
    let colIndex = 0;

    boxes.forEach((box: any) => {
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

const checkIfCanMove = (): boolean => {
    let numOfTakenTiles: number = 0;
    let canMove: boolean = false;

    for (let row = 0; row < tiles.length; row++) {
        let prevValue = 0;
        for (let col = 0; col < tiles[row].length; col++) {
            const currTile: TileElement = tiles[row][col];
            const tileAhead: TileElement = !tiles[row + 1]
                ? null
                : tiles[row + 1][col];

            if (!currTile) continue;
            if (currTile.value === prevValue) canMove = true;
            if (tileAhead && currTile.value === tileAhead.value) canMove = true;

            numOfTakenTiles++;
            prevValue = currTile.value;
        }
    }

    if (numOfTakenTiles >= 16 && !canMove) {
        return false;
    }
    return true;
};

const drawTile = (r: number, c: number, v: number): void => {
    const coords: Coordinates = tileCoords[r][c];
    const placement: Coordinates = gridPos[r][c];
    const newTile: HTMLElement = document.createElement("div");

    newTile.classList.add("tile");
    tiles[r][c] = new Tile(newTile, themeColour, placement, coords, v);
    container.appendChild(newTile);

    tiles[r][c];
};

const setTile = (): void => {
    let row: number = rand();
    let col: number = rand();
    let count: number = rand();
    let takenTiles: string[] = [];
    let tileNotAvailable: boolean = tiles[row][col] !== null;
    const percentage: number = Math.round(Math.random() * 10) / 10;
    const twoOrFour: number = percentage < 1 ? 2 : 4;

    while (tileNotAvailable) {
        if (count >= 16) return;
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

const spawn = (): void => {
    setTimeout(() => {
        setTile();
    }, 150);
};

const removeTile = (deleteTile: Tile, movedTile: Tile): void => {
    setTimeout(() => {
        deleteTile.box.remove();
        movedTile.box.style.zIndex = "0";
    }, 100);
};

const checkScore = (s: number): void => {
    if (s === 2048 && !reachedWin) {
        gameStart = false;
        winScreen.style.display = "flex";
        reachedWin = true;
    }
};

const continueGame = (): void => {
    winScreen.style.display = "none";
    gameStart = true;
    checkInput();
};

const playAgain = (): void => location.reload();

window.addEventListener("resize", () => {
    tileCoords = createCoords();
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const currTile: TileElement = tiles[y][x];
            const newCoords: Coordinates = tileCoords[y][x];
            if (!currTile) continue;

            currTile.coords = newCoords;
        }
    }
});

const start = (): void => {
    tileCoords = createCoords();
    bestScore = getBestScore();
    setTile();
    setTile();
};

start();

const moving = (box: HTMLElement): void => {
    box.classList.add("moving");
};

const idle = (box: HTMLElement): void => {
    setTimeout(() => {
        box.classList.remove("moving");
    }, 100);
};

const moveUp = (): void => {
    for (let y = 1; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];
        const rowAhead: TileElement[] = tiles[y - 1];

        for (let x = 0; x < currRow.length; x++) {
            let currTile: TileElement = currRow[x];
            let tileAhead: TileElement = rowAhead[x];

            let index: number = 1;
            while (tileAhead === null && currTile !== null) {
                if (y - index < 0) break;
                if (
                    (y - index === 0 && tiles[y - index][x] !== null) ||
                    tiles[y - index][x] !== null
                )
                    break;

                const gridPosition: Coordinates = gridPos[y - index][x];
                const coordsToJumpTo: Coordinates = tileCoords[y - index][x];
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

const upCombineCheck = (): void => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];
        const prevRow: TileElement[] = tiles[y + 1];

        if (!prevRow) break;

        for (let x = 0; x < currRow.length; x++) {
            let currTile: TileElement = currRow[x];
            let prevTile: TileElement = prevRow[x];

            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const gridPosition: Coordinates = gridPos[y][x];
            const coordsToJumpTo: Coordinates = tileCoords[y][x];
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

const moveDown = (): void => {
    for (let y = tiles.length - 2; y > -1; y--) {
        const currRow: TileElement[] = tiles[y];
        const rowAhead: TileElement[] = tiles[y + 1];

        for (let x = 0; x < currRow.length; x++) {
            const currTile: TileElement = currRow[x];
            const tileAhead: TileElement = rowAhead[x];

            let index: number = 1;
            while (tileAhead === null && currTile !== null) {
                if (y + index > 3) break;
                if (
                    (y + index === 3 && tiles[y + index][x] !== null) ||
                    tiles[y + index][x] !== null
                )
                    break;

                const gridPosition: Coordinates = gridPos[y + index][x];
                const coordsToJumpTo: Coordinates = tileCoords[y + index][x];
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

const downCombineCheck = (): void => {
    for (let y = tiles.length - 1; y > -1; y--) {
        const currRow: TileElement[] = tiles[y];
        const prevRow: TileElement[] = tiles[y - 1];

        if (!prevRow) break;

        for (let x = 0; x < currRow.length; x++) {
            let currTile: TileElement = currRow[x];
            let prevTile: TileElement = prevRow[x];

            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const gridPosition: Coordinates = gridPos[y][x];
            const coordsToJumpTo: Coordinates = tileCoords[y][x];
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

const moveLeft = (): void => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];

        for (let x = 1; x < currRow.length; x++) {
            const currTile: TileElement = currRow[x];
            const tileAhead: TileElement = currRow[x - 1];

            let index: number = 1;
            while (tileAhead === null && currTile !== null) {
                if (x - index < 0) break;
                if (
                    (x - index === 0 && tiles[y][x - index] !== null) ||
                    tiles[y][x - index] !== null
                )
                    break;

                const gridPosition: Coordinates = gridPos[y][x - index];
                const coordsToJumpTo: Coordinates = tileCoords[y][x - index];
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

const leftCombineCheck = (): void => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];

        for (let x = 0; x < currRow.length; x++) {
            const currTile: TileElement = currRow[x];
            const prevTile: TileElement = currRow[x + 1];

            if (!prevTile) break;
            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const gridPosition: Coordinates = gridPos[y][x];
            const coordsToJumpTo: Coordinates = tileCoords[y][x];
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

const moveRight = (): void => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];

        for (let x = currRow.length - 2; x > -1; x--) {
            const currTile: TileElement = currRow[x];
            const tileAhead: TileElement = currRow[x + 1];

            let index: number = 1;
            while (tileAhead === null && currTile !== null) {
                if (x + index > 3) break;
                if (
                    (x + index === 3 && tiles[y][x + index] !== null) ||
                    tiles[y][x + index] !== null
                )
                    break;

                const gridPosition: Coordinates = gridPos[y][x + index];
                const coordsToJumpTo: Coordinates = tileCoords[y][x + index];
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

const rightCombineCheck = (): void => {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];

        for (let x = currRow.length - 1; x > -1; x--) {
            const currTile: TileElement = currRow[x];
            const prevTile: TileElement = currRow[x - 1];

            if (!prevTile) break;
            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const gridPosition: Coordinates = gridPos[y][x];
            const coordsToJumpTo: Coordinates = tileCoords[y][x];
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

const checkInput = () => {
    if (gameStart) {
        document.addEventListener("keydown", handleInput, { once: true });
    }
};

const handleInput = (e: any) => {
    const key: string = e.key;
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
            checkInput();
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

    checkInput();
};

window.onload = checkInput;

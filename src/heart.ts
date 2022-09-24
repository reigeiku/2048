let tiles: TileElement[][] = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];

const tileCoords: Coordinates[][] = createCoords();
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

let numOfMovements: number = 0;
let score: number = 0;
let bestScore: number = getBestScore();

function checkIfCanMove(): boolean {
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
}

function drawTile(r: number, c: number, v: number): void {
    const coords: Coordinates = tileCoords[r][c];
    const newTile: HTMLElement = document.createElement("div");

    newTile.classList.add("tile");
    tiles[r][c] = new Tile(newTile, themeColour, coords, v);
    container.appendChild(newTile);

    tiles[r][c];
}

function setTile(): void {
    let row: number = rand();
    let col: number = rand();
    let tileNotAvailable: boolean = tiles[row][col] !== null;
    const percentage: number = Math.round(Math.random() * 10) / 10;
    const twoOrFour: number = percentage < 1 ? 2 : 4;

    while (tileNotAvailable) {
        row = rand();
        col = rand();
        tileNotAvailable = tiles[row][col] !== null;
    }

    drawTile(row, col, twoOrFour);

    if (!checkIfCanMove()) {
        gameOverScreen.style.display = "flex";
        return;
    }
}

function spawn(): void {
    setTimeout(() => {
        setTile();
    }, 150);
}

function removeTile(deleteTile: Tile, movedTile: Tile): void {
    setTimeout(() => {
        deleteTile.box.remove();
        movedTile.box.style.zIndex = "0";
    }, 100);
}

function playAgain(): void {
    location.reload();
}

setTile();
setTile();

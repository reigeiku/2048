const tiles: TileElement[][] = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];

const tileCoords: Coordinates[][] = createCoords();

function drawTile(r: number, c: number, v: number): void {
    const coords: Coordinates = tileCoords[r][c];
    const newTile: HTMLElement = document.createElement("div");

    newTile.classList.add("tile");
    tiles[r][c] = new Tile(newTile, [], coords, v);
    container.appendChild(newTile);

    tiles[r][c];
}

function setTile(): void {
    let row: number = rand();
    let col: number = rand();
    let tileNotAvailable: boolean = tiles[row][col] !== null;
    const percentage: number = Math.round(Math.random() * 10) / 10;
    const twoOrFour = percentage < 1 ? 2 : 4;

    while (tileNotAvailable) {
        row = rand();
        col = rand();
        tileNotAvailable = tiles[row][col] !== null;
    }

    drawTile(row, col, twoOrFour);
}

setTile();

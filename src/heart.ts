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
    setupInput();
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

window.onload = start;

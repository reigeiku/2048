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

const setupInput = () => {
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

function moveUp(): void {
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

                const coordsToJumpTo: Coordinates = tileCoords[y - index][x];
                currTile.coords = coordsToJumpTo;

                tiles[y - index][x] = currTile;
                tiles[y - (index - 1)][x] = null;
                index++;
            }
        }
    }
}

function upCombineCheck(): void {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];
        const prevRow: TileElement[] = tiles[y + 1];

        if (!prevRow) break;

        for (let x = 0; x < currRow.length; x++) {
            let currTile: TileElement = currRow[x];
            let prevTile: TileElement = prevRow[x];

            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const coordsToJumpTo: Coordinates = tileCoords[y][x];
            prevTile.box.style.zIndex = "99";
            prevTile.coords = coordsToJumpTo;
            prevTile.value = prevTile.value * 2;

            tiles[y][x] = prevTile;
            tiles[y + 1][x] = null;
            removeTile(currTile, prevTile);
        }
        moveUp();
    }
}

function moveDown(): void {
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

                const coordsToJumpTo: Coordinates = tileCoords[y + index][x];
                currTile.coords = coordsToJumpTo;

                tiles[y + index][x] = currTile;
                tiles[y + (index - 1)][x] = null;
                index++;
            }
        }
    }
}

function downCombineCheck(): void {
    for (let y = tiles.length - 1; y > -1; y--) {
        const currRow: TileElement[] = tiles[y];
        const prevRow: TileElement[] = tiles[y - 1];

        if (!prevRow) break;

        for (let x = 0; x < currRow.length; x++) {
            let currTile: TileElement = currRow[x];
            let prevTile: TileElement = prevRow[x];

            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const coordsToJumpTo: Coordinates = tileCoords[y][x];
            prevTile.coords = coordsToJumpTo;
            prevTile.value = prevTile.value * 2;

            tiles[y][x] = prevTile;
            tiles[y - 1][x] = null;
            removeTile(currTile, prevTile);
        }
        moveDown();
    }
}

function moveLeft(): void {
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

                const coordsToJumpTo: Coordinates = tileCoords[y][x - index];
                currTile.coords = coordsToJumpTo;

                tiles[y][x - index] = currTile;
                tiles[y][x - (index - 1)] = null;
                index++;
            }
        }
    }
}

function leftCombineCheck(): void {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];

        for (let x = 0; x < currRow.length; x++) {
            const currTile: TileElement = currRow[x];
            const prevTile: TileElement = currRow[x + 1];

            if (!prevTile) break;
            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const coordsToJumpTo: Coordinates = tileCoords[y][x];
            prevTile.coords = coordsToJumpTo;
            prevTile.value = prevTile.value * 2;

            tiles[y][x] = prevTile;
            tiles[y][x + 1] = null;
            removeTile(currTile, prevTile);
        }
        moveLeft();
    }
}

function moveRight(): void {
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

                const coordsToJumpTo: Coordinates = tileCoords[y][x + index];
                currTile.coords = coordsToJumpTo;

                tiles[y][x + index] = currTile;
                tiles[y][x + (index - 1)] = null;
                index++;
            }
        }
    }
}

function rightCombineCheck(): void {
    for (let y = 0; y < tiles.length; y++) {
        const currRow: TileElement[] = tiles[y];

        for (let x = currRow.length - 1; x > -1; x--) {
            const currTile: TileElement = currRow[x];
            const prevTile: TileElement = currRow[x - 1];

            if (!prevTile) break;
            if (currTile === null || prevTile === null) continue;
            if (currTile.value !== prevTile.value) continue;

            const coordsToJumpTo: Coordinates = tileCoords[y][x];
            prevTile.coords = coordsToJumpTo;
            prevTile.value = prevTile.value * 2;

            tiles[y][x] = prevTile;
            tiles[y][x - 1] = null;
            removeTile(currTile, prevTile);
        }
        moveRight();
    }
}

function setupInput() {
    document.addEventListener("keydown", handleInput, { once: true });
}

function handleInput(e: any) {
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
    setupInput();
}
setupInput();

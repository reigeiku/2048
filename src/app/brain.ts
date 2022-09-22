type Coordinates = { x: number; y: number };
type Tile = {
    box: HTMLElement | null;
    coords: Coordinates;
    value: number;
};

const container: HTMLElement = document.getElementById("game-container")!;
const boxes: NodeListOf<Element> = document.querySelectorAll(".col")!;

const mapCoords = (mapToFill: Tile[][]): Tile[][] => {
    let rowIndex = 0;
    let colIndex = 0;

    boxes.forEach((box: any) => {
        if (colIndex === 4) {
            rowIndex++;
            colIndex = 0;
        }
        mapToFill[rowIndex][colIndex].coords = {
            x: box.offsetLeft,
            y: box.offsetTop,
        };
        colIndex++;
    });

    return mapToFill;
};

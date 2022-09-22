type Coordinates = { x: number; y: number };
type Tile = HTMLElement | null;

const container: HTMLElement = document.getElementById("game-container")!;
const boxes: NodeListOf<Element> = document.querySelectorAll(".col")!;

const createCoords = (): Coordinates[][] => {
    const elementCoords: Coordinates[][] = [];
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

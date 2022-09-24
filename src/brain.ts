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
type Coordinates = { x: number; y: number };
type TileElement = Tile | null;

const scoreBoard: HTMLElement = document.getElementById("score-board")!;
const bestBoard: HTMLElement = document.getElementById("best")!;
const container: HTMLElement = document.getElementById("game-container")!;
const boxes: NodeListOf<Element> = document.querySelectorAll(".col")!;
const gameOverScreen: any = document.querySelectorAll(".gameover-screen")[0]!;

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

const rand = (): number => Math.round(Math.random() * 3);

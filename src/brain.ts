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
const bestBoard: HTMLElement = document.getElementById("best-score")!;
const container: HTMLElement = document.getElementById("game-container")!;
const boxes: NodeListOf<Element> = document.querySelectorAll(".col")!;
const gameOverScreen: any = document.querySelectorAll(".gameover-screen")[0]!;

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
let tileCoords: Coordinates[][];
let numOfMovements: number = 0;
let score: number = 0;
let bestScore: number;

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
type Scores = {
    currentScore: number;
    bestScore: number;
    bestValue: number;
};

const bestValueBoard: HTMLElement = document.getElementById("best-value")!;
const scoreBoard: HTMLElement = document.getElementById("score-board")!;
const bestScoreBoard: HTMLElement = document.getElementById("best-score")!;
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
let tilesValues = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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
let scores: Scores;
let reachedWin: boolean = false;
let gameStart: boolean = true;

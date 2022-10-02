"use strict";
const scoreBoard = document.getElementById("score-board");
const bestBoard = document.getElementById("best-score");
const container = document.getElementById("tile-box");
const boxes = document.querySelectorAll(".col");
const gameOverScreen = document.querySelectorAll(".gameover-screen")[0];
const winScreen = document.querySelectorAll(".win-screen")[0];
const themeColour = {
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
let tiles = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];
let gridPos = [
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
let tileCoords;
let numOfMovements = 0;
let score = 0;
let bestScore;
let reachedWin = false;
let gameStart = true;

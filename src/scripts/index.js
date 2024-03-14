import { create } from "./createBoard";
import { board } from "./board";
import '../styles.css'
import Typewriter from 'typewriter-effect/dist/core';

function typeWriteHeading() {
    new Typewriter('.heading', {
        strings: 'Battleships.',
        autoStart: true,
        loop: true
    });
}

(function () {
    typeWriteHeading()

    create.initCellsOfBoard()
    board.initHoverAndPosOfCells()
})()


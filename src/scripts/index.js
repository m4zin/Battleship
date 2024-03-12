import { deploy } from "./shipsToDeploy";
import { board } from "./board";
import { create } from "./createBoard";
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
    board.initHoverOfCells()
})()


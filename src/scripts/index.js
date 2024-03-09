import {board} from "./board";
import '../styles.css'
import Typewriter from 'typewriter-effect/dist/core';

function typeWriteHeading() {
    new Typewriter('.heading', {
        strings: 'Battleships.',
        autoStart: true,
        loop: true
    });
}

(function() {
    typeWriteHeading()

    board.initCellsOfBoard()
    board.onHoverOfCells()

    // DEBUG
    // console.log(arr)
    // console.log(gameBoard.placedShips)
})()


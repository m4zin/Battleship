import {board} from "./board";
import '../styles.css'
import Typewriter from 'typewriter-effect/dist/core';

function typeWriteHeading() {
    new Typewriter('.heading', {
        strings: ['Battleships.'],
        autoStart: true,
        loop: true
    });
}

(function() {
    typeWriteHeading()

    // const gameBoard = board.GameGrid()
    // let arr = gameBoard.arr
    //
    // let shipOne = board.Ship([0, 1, 2])
    // let shipTwo = board.Ship([20, 21, 22, 23, 24, 25])
    //
    // shipOne.placeShip(arr, gameBoard.addShipToArr)
    // shipTwo.placeShip(arr, gameBoard.addShipToArr)

    board.initCellsOfBoard()

    // DEBUG
    // console.log(arr)
    // console.log(gameBoard.placedShips)
})()


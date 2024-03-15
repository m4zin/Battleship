import { board } from "./board";
import { deploy } from "./shipsToDeploy";

const computer = (function() {

    // Ship position
    let isHorizontal = true

    // Lengths of ship changes when ship placed.
    let length = null

    let ships = {
        carrier: {
            length: 5,
            placed: false
        },
        battleship: {
            length: 4,
            placed: false
        },
        cruiser: {
            length: 3,
            placed: false
        },
        submarine: {
            length: 3,
            placed: false
        },
        destroyer: {
            length: 2,
            placed: false
        },
    }

    let computerBoard = board.GameGrid()

    function placeShips(computerBoard) {
        // Testing on random cell.
        let cell = 98
        return board.setShipOnCells(ships, length, cell, computerBoard, 'random', isHorizontal)
    }

    function initComputerTurn() {
        console.log(placeShips(computerBoard))
    }

    return {
        placeShips,
        initComputerTurn
    }

})()

export {computer}

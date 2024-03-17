import { board } from "./board";
import { deploy } from "./shipsToDeploy";

const computer = (function () {

    let computerBoard = board.GameGrid()

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

    let length = null

    function placeShips(computerBoard) {
        // Math.floor(Math.random() * 100);
        let cell = null
        // Boolean(Math.round(Math.random()));
        let isHorizontal = null

        let ship = null
        let shipsPlaced = []
        let allShipsPlaced = false

        do {
            cell = Math.floor(Math.random() * 100);
            isHorizontal = Boolean(Math.round(Math.random()));

            try {
                ship = board.setShipOnCells('computer', ships, length, cell, computerBoard, 'random', isHorizontal)

                // When 5 ships are present, return.
                if (shipsPlaced.length === 5) {
                    allShipsPlaced = true
                }

                if (shipsPlaced.length === 0) {
                    shipsPlaced.push(ship)
                    let shipObj = board.Ship(ship)
                    shipObj.placeShip(computerBoard.arr, computerBoard.addShipToArr)
                    continue;
                }

                for (let i = 0; i < shipsPlaced.length; i++) {
                    for (let j = 0; j < shipsPlaced[i].length; j++) {
                        if (ship.some(elem => elem === shipsPlaced[i][j])) {
                            continue;
                        } 
                    }
                }

                shipsPlaced.push(ship)
                let shipObj = board.Ship(ship)
                shipObj.placeShip(computerBoard.arr, computerBoard.addShipToArr)
            } catch (error) {
                continue
            }
        } while (!allShipsPlaced)

        for (let i = 0; i < computerBoard.arr.length; i++) {
            if (computerBoard.arr[i] === 1) {
                document.getElementById(`${i}-computer`).style.backgroundColor = 'red'
            }
        }

    }

    function initComputerTurn() {
        placeShips(computerBoard)
    }

    return {
        placeShips,
        initComputerTurn
    }

})()

export { computer }

import { board } from "./board";

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

    function randomizeShips(computerBoard, ships) {
        let cell = null
        let isHorizontal = null

        let ship = null
        let shipsPlaced = []
        let allShipsPlaced = false
        let cellExists = null

        do {
            cell = Math.floor(Math.random() * 100);
            isHorizontal = Boolean(Math.round(Math.random()));
            cellExists = false

            try {
                ship = board.setShipOnCells('computer', ships, length, cell, 'random', isHorizontal)

                // Undefined behavior would get returned whenever the ship placement is out of bounds.
                if (ship === undefined) {
                    continue
                }

                // When 5 ships are present, return.
                if (ship === true) {
                    allShipsPlaced = true
                }

                // Placing first ship if the array is empty.
                if (shipsPlaced.length === 0) {
                    shipsPlaced.push(ship)
                    continue;
                }

                outerLoop:
                for (let i = 0; i < shipsPlaced.length; i++) {
                    for (let j = 0; j < shipsPlaced[i].length; j++) {
                        if (ship.some(elem => elem === shipsPlaced[i][j])) {
                            let currentShipName = Object.keys(ships).find(shipName => ships[shipName].length === ship.length);
                            ships[currentShipName].placed = false
                            cellExists = true
                            break outerLoop;
                        } 
                    }
                }

                if (cellExists === true) {
                    continue;
                } else {
                    shipsPlaced.push(ship)
                }
            } catch (error) {
                continue
            }
        } while (!allShipsPlaced)

        let shipOnGameBoard = null

        for (let i = 0; i < shipsPlaced.length; i++) {
            shipOnGameBoard = board.Ship(shipsPlaced[i])
            shipOnGameBoard.placeShip(computerBoard.arr, computerBoard.addShipToArr)
        }

        // DEBUG
        console.log(computerBoard.arr)
        console.log(computerBoard.placedShips)
    }

    function initComputerTurn() {
        randomizeShips(computerBoard, ships)
    }

    return {
        initComputerTurn
    }

})()

export { computer }
    
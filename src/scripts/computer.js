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

    function placeShips(ships) {
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

        // DEBUG
        let count = 0 

        for (let i = 0; i < shipsPlaced.length; i++) {
            for (let j = 0; j < shipsPlaced[i].length; j++) {
                count++
                document.getElementById(`${shipsPlaced[i][j]}-computer`).style.backgroundColor = 'red'
            }
        }

        console.log(count)
        console.log(shipsPlaced)
        // DEBUG
    }

    function initComputerTurn() {
        placeShips(ships)
    }

    return {
        placeShips,
        initComputerTurn
    }

})()

export { computer }

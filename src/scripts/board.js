import {deploy} from "./shipsToDeploy";

const board = (function() {
    function Ship(coordinates) {
        let placeShip = (arr, storeShip) => {
            if(coordinates.length > 1 && coordinates.length < 7) {
                if(checkIfOccupied(arr, coordinates)) {
                    return false
                }

                // Storing newly placed ship into an array,
                // So i can later use it to evaluate if all ships sunk
                // in game board.
                storeShip(coordinates)

                // This is the array that is acting as the gameBoard.
                for (let i = 0; i < coordinates.length; i++) {
                    arr[coordinates[i]] = 1 // Placing ship on board.
                }

                return true
            }
        }

        return {
            placeShip
        }
    }

    function GameGrid() {
        let arr = new Array(100).fill(null)
        let placedShips = []

        let addShipToArr = (coordinates) => {
            placedShips.push(coordinates)
        }

        let receiveAttack = (e) => {
            let cell = e.getAttribute('value')

            if(placedShips) {
                // This helps in identifying the ship as a whole when a cell is hit.
                    // The cell has to be a part of the ship.
                for(let i = 0; i < placedShips.length; i++) {
                    for(let j = 0; j < placedShips[i].length; j++) {
                        // If cell is a part of placed ships, then display ships attacked!,
                        // Else display empty cell hit.
                        if(cell === placedShips[i][j]) {

                        } else {

                        }
                    }
                }
            }
        }

        return {
            arr,
            placedShips,
            addShipToArr,
            receiveAttack
        }
    }

    function checkIfOccupied(arr, coordinates) {
        for (let i = 0; i < coordinates.length; i++) {
            if(arr[coordinates[i]] === 1) {
                return true
            }
        }
    }

    function setShipOnCells(event) {
        let hoveredOverCell = parseInt(event.target.id)
        let arrCells = []

        // TODO: Using the same logic below,
            // Create 5 different ships of different length.
            // Make sure they are all made from one single function.
            // One should be placed after another.

        // this is returning array tailored only for ship of length 5 for now.
        // Make sure to implement the above to-do properly.
        return deploy.shipOfLen(4, hoveredOverCell, arrCells)
    }

    function highlightCells(result, color) {
        // If any of the cells contain orange (place shipped then return.)
        if (result.some((elem) => elem.style.backgroundColor === 'red')) {
            return
        }

        result.forEach((item) => {
            item.style.backgroundColor = color
        })
    }

    function onAndOffHover(event, callback) {
        let result = setShipOnCells(event)

        if(result instanceof Array) {
            if(event.type === 'mouseover') {
                callback(result, 'grey');
            } else if(event.type === 'mouseleave') {
                callback(result, 'transparent');
            } else if (event.type === 'click') {
                callback(result, 'red')
            }
        }
    }

    function initHoverOfCells() {
        const board = document.querySelector('.board-one')
        const cells = board.querySelectorAll('.cell')

        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('mouseover', (event) => {
                onAndOffHover(event, highlightCells)
            })
            cells[i].addEventListener('mouseleave', (event) => {
                onAndOffHover(event, highlightCells)
            })
            cells[i].addEventListener('click', (event) => {
                onAndOffHover(event, highlightCells)
            })
        }
    }

    return {
        GameGrid,
        Ship,
        initHoverOfCells
    }
})()

export {board}

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

    function addDivsToBoard(board) {
        let numOfLoops = 100; // Cause' 100 cells.
        let areaOfInsideSquare = 400 / 10

        for (let i = 0; i < numOfLoops; i++) {
            let cell = document.createElement("div");

            cell.classList.add("cell");
            cell.setAttribute('value', `${i}`)
            cell.style.height = `${areaOfInsideSquare}px`;
            cell.style.width = `${areaOfInsideSquare}px`;
            board.appendChild(cell);
        }
    }

    function initCellsOfBoard() {
        const playerBoard = document.querySelector('.board-one')
        const computerBoard = document.querySelector('.board-two')

        addDivsToBoard(playerBoard)
        addDivsToBoard(computerBoard)
    }

    return {
        GameGrid,
        Ship,
        initCellsOfBoard
    }
})()

export {board}

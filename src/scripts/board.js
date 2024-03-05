const board = (function() {
    function Ship(length, coordinates) {
        let placeShip = (arr, storeShip) => {
            if(length > 1 && length < 7) {
                if(checkIfOccupied(arr, length, coordinates)) {
                    return 'Spot occupied!'
                }

                // Storing newly placed ship into an array,
                // So i can later use it to evaluate if all ships sunk
                // in game board.
                storeShip(coordinates)

                for (let i = 0; i < length; i++) {
                    arr[coordinates[i]] = 1 // Placing ship on board.
                }

                return 'Ship placed.'
            }
        }

        return {
            length,
            coordinates,
            placeShip
        }
    }

    function GameGrid() {
        let arr = new Array(100).fill(null)
        let placedShips = []
        let addShipToArr = (coordinates) => {
            placedShips.push(coordinates)
        }

        return {
            arr,
            addShipToArr,
            placedShips
        }
    }

    function checkIfOccupied(arr, length, coordinates) {
        for (let i = 0; i < length; i++) {
            if(arr[coordinates[i]] === 1) {
                return true
            }
        }
    }

    return {
        GameGrid,
        Ship
    }
})()

export {board}

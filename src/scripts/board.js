const board = (function() {
    function checkIfOccupied(arr, length, coordinates) {
        for (let i = 0; i < length; i++) {
            if(arr[coordinates[i]] === 1) {
                return true
            }
        }
    }

    function GameGrid() {
        let arr = new Array(100).fill(null)
        let placeShip = (ship) => {
            const {length, coordinates} = ship
            if(length > 1 && length < 7) {
                if(checkIfOccupied(arr, length, coordinates)) {
                    return `Spot occupied!`
                }

                for (let i = 0; i < length; i++) {
                    arr[coordinates[i]] = 1 // Placing ship on board.
                }

                return `Ship placed.`
            }
        }
        return {
            arr, placeShip
        }
    }

    return {
        GameGrid
    }
})()

export {board}

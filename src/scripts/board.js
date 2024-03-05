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

        let receiveAttack = (attack, hitMarker, noHitMarker) => {
            if(placedShips) {
                // Attack being received by ship as a whole.
                // This helps in identifying the ship as a whole.
                for(let i = 0; i < placedShips.length; i++) {
                    for(let j = 0; j < placedShips[i].length; j++) {
                        if(attack === placedShips[i][j]) {
                            placedShips[i][j] = hitMarker
                            arr[attack] = hitMarker
                            return true
                        }
                    }
                }

                // Or if cell with no ship contained hit, then
                arr[attack] = noHitMarker
                return false
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

    return {
        GameGrid,
        Ship
    }
})()

export {board}

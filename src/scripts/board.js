import { deploy } from "./shipsToDeploy";

const board = (function () {
    let game = GameGrid()
    let gameArr = game.arr
    let isHorizontal = true
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

    function Ship(coordinates) {
        let placeShip = (arr) => {
            if (coordinates.length > 1 && coordinates.length < 7) {
                if (checkIfOccupied(arr, coordinates)) {
                    return false
                }

                // Storing newly placed ship into an array,
                // So i can later use it to evaluate other rules of the game.
                GameGrid().addShipToArr(coordinates)

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

        // This is used in function Ship.placeShip() to push the ship coordinates
        // into placedShips [].
        let addShipToArr = (coordinates) => {
            placedShips.push([coordinates])
        }

        let receiveAttack = (e) => {
            let cell = e.getAttribute('value')

            if (placedShips) {
                // This helps in identifying the ship as a whole when a cell is hit.
                // The cell has to be a part of the ship.
                for (let i = 0; i < placedShips.length; i++) {
                    for (let j = 0; j < placedShips[i].length; j++) {
                        // If cell is a part of placed ships, then display ships attacked!,
                        // Else display empty cell hit.
                        if (cell === placedShips[i][j]) {

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
            if (arr[coordinates[i]] === 1) {
                return true
            }
        }
    }

    function setShipOnCells(event, eventType, shipPosition) {
        let hoveredOverCell = parseInt(event.target.id)

        // Implementing the below ships,
        // Carrier (occupies 5 spaces), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2).

        // If the last ship is placed then return.
        if (ships.destroyer.placed === true) {
            return
        }

        // Cycle through each ship and use their appropriate lengths.
        for (let ship in ships) {
            if (!ships[ship].placed) {
                length = ships[ship].length
                break;
            }
        }

        // Currently only creating ship of length 4
        let deployedShip = deploy.shipOfLen(length, hoveredOverCell, shipPosition)
        let coordinatesOfShip = []

        if (eventType === 'click') {
            // Once a specific ship is placed, loop to the next ship by denoting boolean for
            // previous ship as placed.
            for (let ship in ships) {
                if (!ships[ship].placed) {
                    ships[ship].placed = true
                    break;
                }
            }

            // Looping through returned delployedShip [] and getting the coordinates that'll be used on our game board arr.
            for (let i = 0; i < deployedShip.length; i++) {
                coordinatesOfShip.push(deployedShip[i].id)
            }
            let ship = Ship(coordinatesOfShip)
            ship.placeShip(gameArr)
        }
        return deployedShip
    }

    function onAndOffHover(event, callback) {
        let result = setShipOnCells(event, event.type, isHorizontal)

        if (result instanceof Array) {
            if (event.type === 'mouseover') {
                callback(result, 'grey');
            } else if (event.type === 'mouseleave') {
                callback(result, 'transparent');
            } else if (event.type === 'click') {
                callback(result, 'red')
            }
        }
    }

    function highlightCells(result, color) {
        // If any of the cells contain red (placed ship) then return.
        if (result.some((elem) => elem.style.backgroundColor === 'red')) {
            return
        }

        result.forEach((item) => {
            item.style.backgroundColor = color
        })
    }

    function initHoverOfCells() {
        const board = document.querySelector('.board-one')
        const cells = board.querySelectorAll('.cell')
        const shipPositionBtn = document.querySelector('.ship-position')

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

        shipPositionBtn.addEventListener('click', () => {
            if (isHorizontal) {
                isHorizontal = false
                shipPositionBtn.innerHTML = 'Vertical'
                return
            }
            isHorizontal = true
            shipPositionBtn.innerHTML = 'Horizontal'
        })
    }

    return {
        GameGrid,
        Ship,
        initHoverOfCells
    }
})()

export { board }

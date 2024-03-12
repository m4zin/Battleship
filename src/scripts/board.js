import { deploy } from "./shipsToDeploy";

const board = (function () {
    let game = GameGrid()
    let gameArr = game.arr
    let isHorizontal = true

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

        // Currently only creating ship of length 4
        let deployedShip = deploy.shipOfLen(3, hoveredOverCell, shipPosition)
        let coordinatesOfShip = []

        if (eventType === 'click') {
            // Looping through returned delployedShip []
            // and getting the coordinates for it to be used on our game board arr.
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
            } else {
                isHorizontal = true
                shipPositionBtn.innerHTML = 'Horizontal'
            }
        })
    }

    return {
        GameGrid,
        Ship,
        initHoverOfCells
    }
})()

export { board }

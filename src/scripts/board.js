import { deploy } from "./shipsToDeploy";
import { computer } from "./computer";

const board = (function () {
    let playerBoard = GameGrid()

    // Ship position
    let isHorizontal = true

    // Lengths of ship changes when ship placed.
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
        let placeShip = (arr, placeShipCb) => {
            if (coordinates.length > 1 && coordinates.length < 7) {
                // Storing newly placed ship into an array,
                // So i can later use it to evaluate other rules of the game.
                placeShipCb(coordinates)

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
            placedShips.push(coordinates)
        }

        return {
            arr,
            placedShips,
            addShipToArr
        }
    }

    function removePlayerListeners() {
        const board = document.querySelector('.board-one')
        const cells = board.querySelectorAll('.cell')

        cells.forEach(cell => {
            cell.removeEventListener('mouseover', handleCellHover)
            cell.removeEventListener('mouseleave', handleCellHover)
            cell.removeEventListener('click', handleCellClick)
        })

        console.log(playerBoard.arr)
        console.log(playerBoard.placedShips)

        computer.initComputerTurn()
    }

    function setShipOnCells(opponent, ships, length, cell, eventType, shipPosition) {
        // If last ship is placed, then return
        if (ships.destroyer.placed) {
            return true
        }
            
        // Cycle through each ship and use their appropriate lengths.
        for (let ship in ships) {
            if (!ships[ship].placed) {
                length = ships[ship].length
                break;
            }
        }

        let deployedShip = deploy.shipOfLen(opponent, length, cell, shipPosition)
        let coordinatesOfShip = []

        if (deployedShip === undefined) {
            return
        }

        if (eventType === 'click' || eventType === 'random') {
            // Once a specific ship is placed, loop to the next ship by making placed bool to true.
            for (let ship in ships) {
                if (!ships[ship].placed) {
                    ships[ship].placed = true
                    break;
                }
            }

            // Looping through returned delployedShip [] and getting the coordinates that'll be used on our game board arr.
            // It will also store in the placedShip [] of our game object, which will help us later on for the attack part.
            for (let i = 0; i < deployedShip.length; i++) {
                coordinatesOfShip.push(parseInt(deployedShip[i].id).toString())
            }

            // We would only need the value of each cell and not the element itself -
            // if we are setting ships on the computer board.
            if (eventType === 'random') {
                return coordinatesOfShip
            }
        }
        return deployedShip
    }

    function onAndOffHover(event, callback) {
        let cell = parseInt(event.target.id).toString()
        let result = setShipOnCells('player', ships, length, cell, event.type, isHorizontal)
        // Adding player ships to player's board.
        let playerShip = null

        // result will only return true when all ships have been placed.
        if (result === true) {
            removePlayerListeners()
        }

        if (result instanceof Array) {
            if (event.type === 'mouseover') {
                callback(result, 'grey');
            } else if (event.type === 'mouseleave') {
                callback(result, 'transparent');
            } else if (event.type === 'click') {
                // When clicked create ship object and add to player's board.
                addShipToBoard(playerShip, result)
                callback(result, 'red')
            }
        } 
    }

    function addShipToBoard(playerShip, result) {
        playerShip = Ship(result.map(elem => parseInt(elem.id).toString()))
        playerShip.placeShip(playerBoard.arr, playerBoard.addShipToArr)
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

    function handleCellHover(event) {
        onAndOffHover(event, highlightCells)
    }

    function handleCellClick(event) {
        let cellColor = event.target.style.backgroundColor

        // Don't know if we need this anymore. But keeping just in case.
            // We are also checking if it's not transparent because,
            // If a ship is trying to be placed out of bounds, then it has to be rejected.
            // The only time a ship can be placed is when that cell color turns grey.
            // if (cellColor !== 'red' && cellColor !== 'transparent') {
            //     onAndOffHover(event, highlightCells)
            // }
        if (cellColor === 'grey') {
            onAndOffHover(event, highlightCells)
        }
    }

    function initHoverAndPosOfCells() {
        const board = document.querySelector('.board-one')
        const cells = board.querySelectorAll('.cell')
        const shipPosBtn = document.querySelector('.ship-position')

        cells.forEach(cell => {
            cell.addEventListener('mouseover', handleCellHover)
            cell.addEventListener('mouseleave', handleCellHover)
            cell.addEventListener('click', handleCellClick)
        })

        shipPosBtn.addEventListener('click', toggleShipPosition);
    }

    function toggleShipPosition() {
        isHorizontal = !isHorizontal;
        document.querySelector('.ship-position').innerHTML = isHorizontal ? 'Horizontal' : 'Vertical';
    }

    return {
        GameGrid,
        Ship,
        setShipOnCells,
        initHoverAndPosOfCells,
    }
})()

export { board }

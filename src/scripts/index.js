import {board} from "./board";

(function() {
    const gameBoard = board.GameGrid()

    let arr = gameBoard.arr

    let shipOne = board.Ship(3, [0, 1, 2])
    let shipTwo = board.Ship(6, [20, 21, 22, 23, 24, 25])

    shipOne.placeShip(arr, gameBoard.addShipToArr)
    shipTwo.placeShip(arr, gameBoard.addShipToArr)

    gameBoard.receiveAttack(20, 'X', '?')
    gameBoard.receiveAttack(15, 'X', '?')

    // DEBUG
    console.log(arr)
    console.log(gameBoard.placedShips)
})()

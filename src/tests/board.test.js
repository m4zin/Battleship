import {board} from "../scripts/board.js";

describe('Creating game board & placing ships.', () => {
    test('Game board grid has 100 cells', () => {
        let arr = new Array(100).fill(null)
        expect(board.GameGrid().arr).toStrictEqual(arr)
    })
    test('Placement of longest ship (Length: 6)', () => {
        let gameBoard = board.GameGrid()
        let arr = gameBoard.arr
        let ship = board.Ship([0, 1, 2, 3, 4, 5])

        expect(ship.placeShip(arr, gameBoard.addShipToArr)).toBe(true)
    })
    test('Placement of shortest ship (Length: 2)', () => {
        let gameBoard = board.GameGrid()
        let arr = gameBoard.arr
        let ship = board.Ship([20, 21])

        expect(ship.placeShip(arr, gameBoard.addShipToArr)).toBe(true)
    })
    test('placedShips array has ships stored after placing ship.' ,() => {
        let gameBoard = board.GameGrid()
        let arr = gameBoard.arr
        let ship = board.Ship([0, 1, 2, 3, 4, 5])

        ship.placeShip(arr, gameBoard.addShipToArr)

        expect(gameBoard.placedShips).toStrictEqual(
            [
                [0, 1, 2, 3, 4, 5]
            ]
        )
    })

    test('Placement of ship on occupied spot not possible', () => {
        let gameBoard = board.GameGrid()
        let arr = gameBoard.arr

        let ship = board.Ship([0, 1, 2, 3, 4, 5])
        let shipTwo = board.Ship([0, 1, 2, 3, 4, 5])

        ship.placeShip(arr, gameBoard.addShipToArr)

        // When trying to place ship in the same spot as the above ship.
        expect(shipTwo.placeShip(arr, gameBoard.addShipToArr)).toEqual(false)
    })
});

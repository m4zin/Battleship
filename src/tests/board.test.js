import {board} from "../scripts/board";

describe('Creating game board & placing ships.', () => {
    test('Grid has 100 cells', () => {
        let arr = new Array(100).fill(null)
        expect(board.GameGrid().arr).toStrictEqual(arr)
    })
    test('Placement of longest ship (Length: 6)', () => {
        const ship = {
            length: 6,
            coordinates : [0, 1, 2, 3, 4, 5]
        }
        expect(board.GameGrid().placeShip(ship))
            .toBe(`Ship placed.`)
    })
    test('Placement of shortest ship (Length: 2)', () => {
        const ship = {
            length: 2,
            coordinates : [20, 21]
        }
        expect(board.GameGrid().placeShip(ship))
            .toBe(`Ship placed.`)
    })
});

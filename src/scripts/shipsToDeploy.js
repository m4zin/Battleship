import { board } from "./board"

const deploy = (function () {
    function shipOfLen(length, hoveredOverCell) {
        let arrCells = []
        let currCell = null

        // If ship going out of bound, then return.
        if (hoveredOverCell < length - 1) {
            return
        }

        for (let i = hoveredOverCell; i > hoveredOverCell - length; i--) {
            currCell = document.getElementById(`${i}`)
            arrCells.push(currCell)
        }

        // Is this needed? Idk.
        // if (!arrCells) {
        //     return
        // }

        if (hasSurroundingShips(board.gameArr, arrCells) || placeInOneRow(arrCells)) {
            return
        }

        return arrCells
    }

    // Making sure that ship can only be placed in one single row for horizontal case.
    function placeInOneRow(arrOfCells) {
        let startNumOfRow = arrOfCells[0].id.charAt(0)

        // If it's the first row, then no need for check.
        if (arrOfCells[0].id.length !== 1) {
            for (let i = 1; i < arrOfCells.length; i++) {
                if (arrOfCells[i].id.charAt(0) !== startNumOfRow) {
                    return true
                }
            }
        }
        return false
    }

    function hasSurroundingShips(boardArr, arrCells) {
        for (let i = 0; i < arrCells.length; i++) {
            let cell = parseInt(arrCells[i].id);
            let offsets = [-11, -10, -9, -1, 1, 9, 10, 11];

            for (let offset of offsets) {
                let neighbor = cell + offset;
                if (boardArr[neighbor] === 1) {
                    return true;
                }
            }
        }
        return false
    }

    return {
        shipOfLen
    }
})()

export { deploy }
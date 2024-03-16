const deploy = (function () {
    function shipOfLen(opponent, length, hoveredOverCell, shipPosition) {
        let finalArr = null

        if (shipPosition) {
            finalArr = pushShipIntoArr(opponent, length, hoveredOverCell, 1)

            if (finalArr !== undefined && placeInOneRow(finalArr)) {
                return
            }
        } else {
            finalArr = pushShipIntoArr(opponent, length, hoveredOverCell, 10)
        }

        // If ship going out of bound (or technically empty), then return.
        if (finalArr === undefined) {
            return
        }

        return finalArr
    }
    
    function pushShipIntoArr(opponent, length, hoveredOverCell, subtractCells) {
        let arrCells = []
        let currCell = null

        // Once all ships are placed.
        if (length === 0) {
            return
        }

        for (let i = 0; i < length; i++) {
            currCell = document.getElementById(`${hoveredOverCell}-${opponent}`)
            if (currCell === null) {
                return
            }
            arrCells.push(currCell)
            hoveredOverCell = hoveredOverCell - subtractCells
        }

        return arrCells
    }

    function placeInOneRow(arrOfCells) {
        let startNumOfRow = arrOfCells[0].id.charAt(0)

        // if it's just one digit, we'll know that its only row one.
        // else it would be the rest of the rows since the cells are between 10-99
        // Also fuck you    
        let oneOrTwoDigit = parseInt(arrOfCells[0].id).toString()

        // If not the first row, then continue.
        if (oneOrTwoDigit.length !== 1) {
            for (let i = 1; i < arrOfCells.length; i++) {
                if (arrOfCells[i].id.charAt(0) !== startNumOfRow) {
                    return true
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
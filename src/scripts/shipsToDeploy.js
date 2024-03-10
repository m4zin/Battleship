const deploy = (function() {
    function shipOfLen(length, hoveredOverCell, arrCells) {
        let currCell = null

        if (hoveredOverCell < length) {
            return false
        }

        for (let i = hoveredOverCell; i >= hoveredOverCell - length; i--) {
            currCell = document.getElementById(`${i}`)
            arrCells.push(currCell)
        }

        if(!arrCells) {
            return false
        }

        // Making sure that ship can only be placed in one single row
            // for horizontal case.
        let startingNumOfRow = arrCells[0].id.charAt(0)

        // If it's the first row, then no need for check.
        if(arrCells[0].id.length !== 1) {
            for (let i = 1; i < arrCells.length; i++) {
                if(arrCells[i].id.charAt(0) !== startingNumOfRow) {
                    return
                }
            }
        }

        return arrCells
    }

    return {
        shipOfLen
    }
})()

export {deploy}

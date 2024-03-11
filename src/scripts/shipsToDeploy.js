const deploy = (function() {
    function shipOfLen(length, hoveredOverCell) {
        let arrCells = []
        let currCell = null

        if (hoveredOverCell < length) {
            return
        }

        for (let i = hoveredOverCell; i >= hoveredOverCell - length; i--) {
            currCell = document.getElementById(`${i}`)
            arrCells.push(currCell)
        }

        // Is this needed? Idk.
        // if (!arrCells) {
        //     return
        // }

        if (!placeInOneRow(arrCells)) {
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
                if(arrOfCells[i].id.charAt(0) !== startNumOfRow) {
                    return false
                }
            }
        }
        return true
    }

    return {
        shipOfLen
    }
})()

export {deploy}
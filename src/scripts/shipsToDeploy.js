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

        return arrCells
    }

    return {
        shipOfLen
    }

})()

export {deploy}

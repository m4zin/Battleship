const create = (function() {
    function addDivsToBoard(board, opponent) {
        let numOfLoops = 100; // adding 100 square divs to board.
        let areaOfInsideSquare = 400 / 10

        for (let i = 0; i < numOfLoops; i++) {
            let cell = document.createElement("div");

            cell.classList.add("cell");
            cell.setAttribute('value', `${i}`)
            cell.id = `${i}-${opponent}`
            cell.style.height = `${areaOfInsideSquare}px`;
            cell.style.width = `${areaOfInsideSquare}px`;
            board.appendChild(cell);
        }
    }

    function initCellsOfBoard() {
        const playerBoard = document.querySelector('.board-one')
        const computerBoard = document.querySelector('.board-two')

        addDivsToBoard(playerBoard, 'player')
        addDivsToBoard(computerBoard, 'computer')
    }

    return {
        initCellsOfBoard
    }
})()

export {create}



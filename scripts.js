const gameBoardElement = document.getElementById("gameboard-container");
const button = document.getElementById("gameboard");

let players = [];

const GameBoard = () => {

    const board = [];
    
    for (let i = 0; i < 9;i++){
        board[i] = "0";
    };


    let activePlayer = players[0];
    
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    //Create the cells
    const displayCells = () => {
        for (let i = 0; i < 9;i++){
            const cellElement = document.createElement("div");
            //cellElement.appendChild(document.createTextNode(i));
            cellElement.classList.add("cell");
            gameBoardElement.appendChild(cellElement);
            cellElement.onclick = ()=>{
                playRound(i);
            };
        };
    };
    
    const playRound = (cellNumber) => {
        if (board[cellNumber] === "0"){
            board[cellNumber] = activePlayer.mark;
            if(checkWinning(cellNumber, activePlayer.mark)){
                endGame(activePlayer);
            };
            gameBoardElement.childNodes[cellNumber].innerText = activePlayer.mark;
            switchPlayerTurn();
        };
        console.log(board)
    };

    //Check if player is winning after every move
    const checkWinning = (lastCellMarked, playerMark) => {

        //check the rows first
        const rows = [[0,1,2],[3,4,5],[6,7,8]];
        for (let i = 0; i < 3;i++){
            if (rows[i].includes(lastCellMarked)){
                if (rows[i].every((cell)=>board[cell] === playerMark)){
                    return true;
                };
            };
        };

        //check columns
        const cols = [[0,3,6],[1,4,7],[2,5,8]];
        for (let i = 0; i < 3;i++){
            if (cols[i].includes(lastCellMarked)){
                if (cols[i].every((cell)=>board[cell] === playerMark)){
                    return true;
                };
            };
        };

        //check diagonal
        const diagonal = [[0,4,8],[2,4,6]];
        for (let i = 0; i < 2;i++){
            if (diagonal[i].includes(lastCellMarked)){
                if (diagonal[i].every((cell)=>board[cell] === playerMark)){
                    return true;
                };
            };
        };

        

    };

    const endGame = (winningPlayer) => {
        console.log(`Winner is ${winningPlayer.name}`);
    };

    return {playRound, displayCells, switchPlayerTurn};
};



function startGame(playerOneName = "Player1", playerTwoName = "Player2"){    
    players = [
        {
            name: playerOneName,
            mark: "x"
        },
        {
            name: playerTwoName,
            mark: "o"
        }
    ];

    const board = GameBoard();
    board.displayCells();

};

button.addEventListener("click", ()=>{
    startGame();
})
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

    
    const displayCells = () => {
        for (let i = 0; i < 9;i++){
            const cellElement = document.createElement("p");
            cellElement.appendChild(document.createTextNode(i));
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
                console.log("hi")
            }; 
            switchPlayerTurn();
        }
        console.log(board, activePlayer);
    };

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
    };

    return {playRound, displayCells, switchPlayerTurn};
};



function startGame(playerOneName = "Player1", playerTwoName = "Player2"){    
    players = [
        {
            name: playerOneName,
            mark: 1
        },
        {
            name: playerTwoName,
            mark: 2
        }
    ];

    const board = GameBoard();
    board.displayCells();

};

button.addEventListener("click", ()=>{
    startGame();
})
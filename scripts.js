const gameBoardElement = document.getElementById("gameboard-container");
const playerInfoForm = document.getElementById("player-info-form");
const layerMask = document.getElementById("dark-mask");
const gameInfoText = document.getElementById("game-info-text");
const gameInfoCurrentMark = document.getElementById("game-info-current-mark");
const gameInfo = document.getElementById("game-info");
const restartGameBtn = document.getElementById("restart-game-btn");

const nameInputPlayerX = document.getElementById("player-x-name-input");
const nameInputPlayerO = document.getElementById("player-o-name-input");

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
        gameBoardElement.innerHTML = "";
        for (let i = 0; i < 9;i++){
            const cellElement = document.createElement("div");
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
            gameBoardElement.childNodes[cellNumber].innerText = activePlayer.mark;
            if(checkWinning(cellNumber, activePlayer.mark)){
                endGame(activePlayer);
                activePlayer = players[0];
                return;
            };
            switchPlayerTurn();
            gameInfoText.innerText = `${activePlayer.name}'s turn.`;
            gameInfoCurrentMark.innerText = `${activePlayer.name}'s symbol is ${activePlayer.mark}`;
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
        gameInfoText.innerText = `${winningPlayer.name} wins the game.`;
        gameInfoCurrentMark.innerText = "";
        gameBoardElement.style.pointerEvents = "none";
        restartGameBtn.style.display = "initial";
    };

    return {playRound, displayCells, switchPlayerTurn};
};

function startGame(){
    const playerOneName = nameInputPlayerX.value === "" ? "Player X" : nameInputPlayerX.value;
    const playerTwoName = nameInputPlayerO.value === "" ? "Player O" : nameInputPlayerO.value;
    players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ];

    const board = GameBoard();
    board.displayCells();

    layerMask.style.display = "none";
    gameBoardElement.style.backgroundColor = "black";
    playerInfoForm.style.display = "none";
    gameInfo.style.display = "block";
    gameInfoText.innerText = `${playerOneName}'s turn.`;
    gameInfoCurrentMark.innerText = `${playerOneName}'s symbol is ${players[0].mark}`;
    gameBoardElement.style.pointerEvents = "all";
};

function restartGame () {
    layerMask.style.display = "initial";
    gameBoardElement.style.backgroundColor = "gray";
    playerInfoForm.style.display = "grid";
    gameInfo.style.display = "none";
    restartGameBtn.style.display = "none";

    const board = GameBoard();
    board.displayCells();
}

playerInfoForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    startGame();
});

restartGameBtn.addEventListener("click", ()=>{
    restartGame();
});
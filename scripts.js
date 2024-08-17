const gameBoardElement = document.getElementById("gameboard");

const GameBoard = () => {


    const board = [];


    for (let i = 0; i < 3;i++){
        board[i] = [];
        for (let j = 0; j < 3; j++){
            board[i].push("0");
        }
    };


    const getBoard = board;

    const markCell = (player) => {
        if (cell = "Empty") return;
    };


    return {getBoard};
};



gameBoardElement.addEventListener("click", ()=>{
    const gameBoardDisplay = GameBoard();
    gameBoardElement.innerText = gameBoardDisplay.getBoard;
    console.log(gameBoardDisplay.getBoard);
})
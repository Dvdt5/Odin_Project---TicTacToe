const gameBoardElement = document.getElementById("gameboard");

const GameBoard = () => {


    const board = [];


    for (let i = 0; i < 3;i++){
        board[i] = [];
        for (let j = 0; j < 3; j++){
            board[i].push("0");
        }
    };


    const getBoard = () => board;

    const markCell = (row, col, player) => {
        if (board[row][col] === "0") {
            board[row][col] = player.mark;
        } else return;

    };

    return {getBoard, markCell};
};



gameBoardElement.addEventListener("click", ()=>{
    const gameBoardDisplay = GameBoard();
    gameBoardElement.innerText = gameBoardDisplay.getBoard();
    console.log(gameBoardDisplay.getBoard);
})
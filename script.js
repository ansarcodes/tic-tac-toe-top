//iife
const gameBoard = (() => {
    //private variable(array)
    let board = ["","","","","","","","",""];
    let winningCombination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    //factory function
    const markBoard = (mark) => {
        return function(x) {
            board[x] = mark;
        }
    };
    const getBoard = () => board;
    const resetBoard = () => {
        board = ["","","","","","","","",""];
    };
    const checkWin = (mark) => {
        let win = false;
        for (const [x, y, z] of winningCombination) {
            if (board[x] == mark && board[y] == mark && board[z] == mark){
                win=true;
                break;
            } else {win=false;};
        };
        return win;
    };
    return {markBoard, getBoard, resetBoard, checkWin};
})();
// let markX = gameBoard.markBoard("X");
// let markO = gameBoard.markBoard("O");

const displayController= (() => {

})();

function players(playerName, playerMark) {
    const name = playerName;
    const mark = playerMark;
    let score = 0;
    let turn = false;

    const getName = () => name;
    const getMark = () => mark;
    const getScore = () => score;
    const addScore = () => ++score;
    const resetScore = () => score=0;

    return {getName, getMark, getScore, addScore, resetScore};
};
// let player1 = players("Player1", "X");
// let player2 = players("Player2", "O");

const gameController = (() => {
    const board = gameBoard.getBoard();
    const playersPool = [];
    playersPool[0] = players("Player 1", "X");
    playersPool[1] = players("Player 2", "O");
    let turn = 0; //no one's turn(1 = player 1; 2 = player 2)
    const startGame = () => {
        gameBoard.resetBoard();
        turn = 1;
        if(playerWon()){
            playersPool[0].resetScore();
            playersPool[1].resetScore();
        }
    };
    function playerWon() {
        if (playersPool[0].getScore() == 3){
            console.log(`${playersPool[0].getName()} won!`);
            console.log(`${playersPool[0].getName()} ${playersPool[0].getScore()}-${playersPool[1].getScore()} ${playersPool[1].getName()}`);
            return true;
        } else if (playersPool[1].getScore() == 3){
            console.log(`${playersPool[1].getName()} won!`);
            console.log(`${playersPool[0].getName()} ${playersPool[0].getScore()}-${playersPool[1].getScore()} ${playersPool[1].getName()}`);
            return true;
        } else {
            console.log(`${playersPool[0].getName()} ${playersPool[0].getScore()}-${playersPool[1].getScore()} ${playersPool[1].getName()}`);
            return false}
    };
    function scoreGame() {
        if (board.every(coordinate=>coordinate!="")){
            turn = 0;
            console.log("It's a tie!")
        } else if(gameBoard.checkWin(playersPool[0].getMark())){
            playersPool[0].addScore();
            console.log("Player 1 scored.");
            turn = 0;
        } else if(gameBoard.checkWin(playersPool[1].getMark())){
            playersPool[1].addScore();
            console.log("Player 2 scored.");
            turn = 0;
        }
    }
    const takeTurn = (coordinate) => {
        if (board[coordinate] == "") {
            switch(turn){
                case 0:
                    break;
                case 1:
                    let player1mark = gameBoard.markBoard(playersPool[0].getMark());
                    player1mark(coordinate);
                    turn = 2;
                    scoreGame();
                    playerWon();
                    break;
                case 2:
                    let player2mark = gameBoard.markBoard(playersPool[1].getMark());
                    player2mark(coordinate);
                    turn = 1;
                    scoreGame();
                    playerWon();
                    break;
            }
        } else {console.log("This square is already taken, try another!")}
    }
    return {playersPool, startGame, takeTurn}
    }
)();
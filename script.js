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
    const getTurn = () => turn;
    const switchTurn = () => {(turn) ? turn=false:turn=true;}

    return {getName, getMark, getScore, addScore, resetScore, getTurn, switchTurn};
};
// let player1 = players("Player1", "X");
// let player2 = players("Player2", "O");

const gameController = (() => {
    const board = gameBoard.getBoard();
    const playersPool = [];
    playersPool[0] = players("Player 1", "X");
    playersPool[1] = players("Player 2", "O");
    const startGame = () => {
        gameBoard.resetBoard();
        playersPool[0].switchTurn();
    };
    function scoreGame(player) {
        if (gameBoard.checkWin(player.getMark()) ){
            player.addScore();
            playersPool[0].getTurn()?playersPool[0].switchTurn():playersPool[1].switchTurn();
        } else if (board.every(coordinate=>coordinate!="")){
            playersPool[0].getTurn()?playersPool[0].switchTurn():playersPool[1].switchTurn();
        }
    }
    const takeTurn = (coordinate) => {
        if (board[coordinate] == "") {
            playersPool.forEach((player) => {
                if (player.getTurn() == true) {
                    let playerMark = gameBoard.markBoard(player.getMark());
                    playerMark(coordinate);
                    player.switchTurn();
                    scoreGame(player);
                } else {
                    player.switchTurn();
                }
            })
        };
    }
    return {playersPool, startGame, takeTurn}
    }
)();
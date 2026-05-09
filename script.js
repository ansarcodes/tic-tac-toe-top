//iife
const gameBoard = (() => {
    //private variable(array)
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    //factory function
    const markBoard = (mark) => {
        return function(x, y) {
            board[x][y] = mark;
        }
    }
    const getBoard = () => board;
    const resetBoard = () => {
        board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]};
    return {markBoard, getBoard, resetBoard};
}
)();
let markX = gameBoard.markBoard("X");
let markO = gameBoard.markBoard("O");

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
    const getTurn = () => turn;
    const switchTurn = () => {(turn) ? turn=false:turn=true;}

    return {getName, getMark, getScore, getTurn, switchTurn};
};
let player1 = players("Player1", "X");
let player2 = players("Player2", "O");
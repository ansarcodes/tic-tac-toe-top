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

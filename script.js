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

    return {markBoard, board};
}
)();
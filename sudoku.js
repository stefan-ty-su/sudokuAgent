"use strict"

class SudokuLayout {

    constructor(sudokuArr) {

        if (SudokuLayout.isValidSudokuArr(sudokuArr) == true) {
            this.grid = sudokuArr;
        }
        else {
            console.log("Sudoku arr is not valid");
        }

    }

    static gridSize = 9;
    static isValidSudokuArr(sudokuArr) {
        
        // Variable Definitions
        let seen = new Set();
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {

            let num = sudokuArr[i][j]
            if (num != '.') {
                let rowString = 'row' + i + num;
                let colString = 'col' + j + num;
                let sqString = 'block' + Math.floor(i/3) + Math.floor(j/3) + num;

                if (seen.has(rowString) ||
                    seen.has(colString) ||
                    seen.has(sqString)) {
                    return false;
                }

                seen.add(rowString);
                seen.add(colString);
                seen.add(sqString);
            }

            }
        }

        return true
    }
}

let sa = [
    ["5","3",".",".","7",".",".",".","."],
    ["5",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];

let layout = new SudokuLayout(sa);
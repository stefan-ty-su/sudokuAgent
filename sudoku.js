"use strict"

class SudokuLayout {

    constructor(sudokuArr) {

        if (this.isValidSudokuArr(sudokuArr)) {
            this.grid = sudokuArr;
        }

    }

    static gridSize = 9;
    static isValidSudokuArr(sudokuArr) {
        
        // Variable Definitions
        let seen = Set();
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {

            let num = sudokuArr[i][j]
            if (num != '.') {
                let rowString = 'row' + i + num;
                let colString = 'col' + j + num;
                let sqString = block + Math.floor(i/3) + Math.floor(j/3) + num;

                if (rowString in seen ||
                    colString in seen ||
                    sqString in seen) {
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
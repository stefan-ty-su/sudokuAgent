"use strict"

class SudokuLayout {

    constructor(sudokuArr) {

        this.seen = new Set();
        this.validMoves = new Map();
        this.gridSize = 9;
        if (this.isValidSudokuArr(sudokuArr) == true) {
            this.grid = sudokuArr;
            this.calcValidMoves();
        }
        else {
            console.log("Sudoku arr is not valid");
        }

    }

    isValidSudokuArr(sudokuArr) {
        
        let num;
        let rowString;
        let colString;
        let sqString;

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {

            num = sudokuArr[i][j]
            if (num != '.') {
                rowString = 'row' + i + num;
                colString = 'col' + j + num;
                sqString = 'block' + Math.floor(i/3) + Math.floor(j/3) + num;

                if (this.seen.has(rowString) ||
                    this.seen.has(colString) ||
                    this.seen.has(sqString)) {
                    return false;
                }

                this.seen.add(rowString);
                this.seen.add(colString);
                this.seen.add(sqString);
            }

            }
        }

        return true
    }

    calcValidMoves() {

        let num;
        let rowString;
        let colString;
        let sqString;
        let arr;
        let iStr;
        let jStr;

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {

                num = this.grid[i][j]
                if (num == '.') {
                    for(let k = 0; k < this.gridSize; k++) {
                        rowString = 'row' + i + k;
                        colString = 'col' + j + k;
                        sqString = 'block' + Math.floor(i/3) + Math.floor(j/3) + k;

                        if (!this.seen.has(rowString) &&
                            !this.seen.has(colString) &&
                            !this.seen.has(sqString)) {
                            
                            iStr = String(i);
                            jStr = String(j);
                            if (this.validMoves.has(iStr + jStr)) {
                                arr = this.validMoves.get(iStr + jStr);
                                arr.push(k)
                            }
                            else {
                                arr = [k];
                                this.validMoves.set(iStr + jStr, arr);
                            }
                            
                        }

                    }
                }

            }
        }
    }
}

let sa = [
    ["5","3",".",".","7",".",".",".","."],
    [".",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];

let layout = new SudokuLayout(sa);
console.log(layout.validMoves);
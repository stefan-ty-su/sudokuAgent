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
            throw new Error("Soduku Invalid")
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
                    for(let k = 1; k < this.gridSize+1; k++) {
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
                                arr.push(k);
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

        return null;
    }

    playMove(row, col, number) {

        let rowString;
        let colString;
        let sqString;
        let rowStr = String(row);
        let colStr = String(col);
        let arr;
        let index;
        let sqx;
        let sqy;

        if (!this.validMoves.has(rowStr + colStr)) { // player tries playing at a position that is invalid
            throw new Error("Invalid Move");
        }
        else if (!this.validMoves.get(rowStr + colStr).includes(number)) { // player tries playing invalid number at position
            throw new Error("Invalid Number");
        }

        // Adding move to seen
        rowString = 'row' + row + number;
        colString = 'col' + col + number;
        sqx = Math.floor(row/3);
        sqy = Math.floor(col/3);
        sqString = 'block' + sqx + sqy + number;
        this.seen.add(rowString);
        this.seen.add(colString);
        this.seen.add(sqString);

        // Removing move form valid moves
        this.validMoves.delete(rowStr + colStr); // Removing entire position from valid moves

        for (let j = 0; j < this.gridSize; j++) { // Removing from positions in-line (rows)
            if (this.validMoves.has(rowStr + String(j))) {
                arr = this.validMoves.get(rowStr + String(j));
                index = arr.indexOf(number);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        }

        for (let j = 0; j < this.gridSize; j++) { // Removing from positions in-line (cols)
            if (this.validMoves.has(String(j) + colStr)) {
                arr = this.validMoves.get(String(j) + colStr);
                index = arr.indexOf(number);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        }

        for (let i = sqx*3; i < sqx+3; i++) { // Removing from square
            for (let j = sqy*3; i < sqy+3; i++) {
                if (this.validMoves.has(String(i) + String(j))) {
                    arr = this.validMoves.get(String(i) + String(j));
                    index = arr.indexOf(number);
                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                }
            }
        }

        return null;
    }
    
    isComplete() {
        return this.seen.size == 243;
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
sa = [ // Valid Solved Sudoku
    ["1","2","3","6","7","8","9","4","5"],
    ["5","8","4","2","3","9","7","6","1"],
    ["9","6","7","1","4","5","3","2","8"],
    ["3","7","2","4","6","1","5","8","9"],
    ["6","9","1","5","8","3","2","7","4"],
    ["4","5","8","7","9","2","6","1","3"],
    ["8","3","6","9","2","4","1","5","7"],
    ["2","1","9","8","5","7","4","3","6"],
    ["7","4","5","3","1","6","8","9","2"]
];

let layout = new SudokuLayout(sa);
// console.log(layout.validMoves);
// layout.playMove(8, 0, 1)
console.log(layout.validMoves);
console.log(layout.isComplete());
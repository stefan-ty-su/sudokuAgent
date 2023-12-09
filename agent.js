'use strict'

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
            if (num != '0') {
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
                if (num == '0') {
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
                                arr.push(String(k));
                            }
                            else {
                                arr = [String(k)];
                                this.validMoves.set(iStr + jStr, arr);
                            }
                            
                        }

                    }
                }

            }
        }

        return null;
    }
    
    getAValidPosition() {
        return this.validMoves.keys().next().value; // Returns first key
    }

    getValidValues(row, col) {
        return this.validMoves.get(String(row) + String(col))
    }

}

class SudokuAgent {

    
    constructor(sudokuLayout) {
        this.layout = sudokuLayout;
        this.grid = sudokuLayout.grid;
        this.size = 9;
    }
    
    backtrack() {
        let validPosition = this.layout.getAValidPosition();
        let row = parseInt(validPosition.slice(0,1));
        let col = parseInt(validPosition.slice(1));

        this.backtrackAux(this.grid, row, col);
    }

    backtrackAux(grid, row, col) {

        if (row == this.size - 1 && col == this.size) { // When it reaches the end of the grid
            return true;
        }

        if (col == this.size) {
            row++;
            col = 0;
        }

        if (grid[row][col] != 0) {
            return this.backtrackAux(grid, row, col + 1);
        }

        let value;
        let validValues = this.layout.getValidValues(row, col)
        for(let i = 0; i < validValues.length; i++) {
            value = validValues[i]
            if (this.moveIsSafe(row, col, value)) {
                grid[row][col] = value;
                if (this.backtrackAux(grid, row, col + 1)) {
                    return true;
                }

            }
            grid[row][col] = 0;

        }

        return false

    }

    moveIsSafe(row, col, number) {
        
        // Checking rows
        for (let i = 0; i < layout.gridSize; i++) {
            if (this.grid[i][col] == number) {
                return false
            }
        }

        // Checking cols
        for (let j = 0; j < layout.gridSize; j++) {
            if (this.grid[row][j] == number) {
                return false
            }
        }

        // Checking square
        let sqx = Math.floor(row/3);
        let sqy = Math.floor(col/3);
        for (let i = sqx*3; i < sqx*3 + 3; i++) {
            for (let j = sqy*3; j < sqy*3 + 3; j++) {
                if (this.grid[i][j] == number) {
                    return false
                }
            }
        }

        return true
    }
}

let sa = [
    [5,3,0,0,7,0,0,0,0],
    [0,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
];

let layout = new SudokuLayout(sa);
let agent = new SudokuAgent(layout);
agent.backtrack();
console.log(agent.grid);


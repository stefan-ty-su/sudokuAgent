class SudokuLayout:

    def __init__(self, sudokuArr: list[list[int]]) -> None:
        
        self.seen = set()
        self.validMoves = {}
        self.gridSize = 9
        self.grid = sudokuArr

        if self.isValidSudokuArr(sudokuArr) is True:
            self.calcValidMoves()
            print("This Ran")
        else:
            raise ValueError("Sudoku Invalid")
    
    def isValidSudokuArr(self, sudokuArr: list[list[int]]) -> bool:

        for i in range(self.gridSize):
            for j in range(self.gridSize):
                
                num = sudokuArr[i][j]
                if num != 0:
                    rowStr = f'row{i}{num}'
                    colStr = f'col{j}{num}'
                    sqStr = f'block{i//3}{j//3}{num}'

                    if (rowStr in self.seen or colStr in self.seen or sqStr in self.seen):
                        return False
                
                    self.seen.add(rowStr)
                    self.seen.add(colStr)
                    self.seen.add(sqStr)
        
        return True

    def calcValidMoves(self):
        for i in range(self.gridSize): # Rows
            for j in range(self.gridSize): # Cols
                num = self.grid[i][j]
                if num == 0:
                    for k in range(1, self.gridSize+1):
                        rowStr = f'row{i}{k}'
                        colStr = f'col{j}{k}'
                        sqStr = f'block{i//3}{j//3}{k}'
                        
                        if (rowStr not in self.seen and
                            colStr not in self.seen and
                            sqStr not in self.seen):

                            if (i, j) in self.validMoves:
                                self.validMoves[(i, j)].add(k)
                            else:
                                self.validMoves[(i, j)] = {k}

    def updateValidMoves(self, row: int, col: int, num: int) -> None:
        
        for i in range(self.gridSize):
            if (i, col) in self.validMoves:
                if num in self.validMoves[(i, col)]:
                    self.validMoves[(i, col)].remove(num)
        
        for j in range(self.gridSize):
            if (row, j) in self.validMoves:
                if num in self.validMoves[(row, j)]:
                    self.validMoves[(row, j)].remove(num)
        
        for i in range(row//3*3, row//3*3+3):
            for j in range(col//3*3, col//3*3+3):
                if (i,j) in self.validMoves:
                    if num in self.validMoves[(i, j)]:
                        self.validMoves[(i, j)].remove(num)


    def playMove(self, row: int, col: int, num: int) -> None:
        """
        Assumes move is already validated
        """
        del self.validMoves[(row, col)]
        self.updateValidMoves(row, col, num)
        self.grid[row][col] = num

        



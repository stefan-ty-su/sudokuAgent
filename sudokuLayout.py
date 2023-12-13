class SudokuLayout:

    def __init__(self, sudokuArr: list[list[int]]) -> None:
        
        self.seen = set()
        self.validMoves = {}
        self.gridSize = 9
        self.grid = sudokuArr

        if self.isValidSudokuArr(sudokuArr) is True:
            self.calcValidMoves()
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

        for i in range(self.gridSize):
            for j in range(self.gridSize):
                num = self.grid[i][j]
                if num == 0:
                    for k in range(1,10):
                        rowStr = f'row{i}{k}'
                        colStr = f'col{j}{k}'
                        sqStr = f'block{i//3}{j//3}{k}'
                        
                        if (rowStr not in self.seen and
                            colStr not in self.seen and
                            sqStr not in self.seen):

                            if (i, j) in self.validMoves:
                                self.validMoves[(i, j)].append(k)
                            else:
                                self.validMoves[(i, j)] = [k]





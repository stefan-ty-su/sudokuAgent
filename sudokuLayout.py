class SudokuLayout:

    def __init__(self, sudokuArr: list[list[int]]) -> None:
        
        self.seen = set()
        self.priorityDict = dict()
        self.gridSize = 9
        self.grid = sudokuArr

        if self.isValidSudokuArr(sudokuArr) is True:
            self.calcOGValidMoves()
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

    def calcOGValidMoves(self):
        validMoves = {}
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

                            if (i, j) in validMoves:
                                validMoves[(i, j)].append(k)
                            else:
                                validMoves[(i, j)] = [k]

        rowCount = [dict() for i in range(self.gridSize)]
        colCount = [dict() for j in range(self.gridSize)]
        blockCount = [dict() for k in range(self.gridSize)]

        # Rows
        for i in range(self.gridSize):
            temp = []
            for j in range(self.gridSize):
                if (i, j) in validMoves:
                    for value in validMoves[(i,j)]:
                        temp.append(value)
            
            tempSet = set(temp)
            for num in tempSet:
                rowCount[i][num] = temp.count(num)

        # Cols
        for j in range(self.gridSize):
            temp = []
            for i in range(self.gridSize):
                if (i, j) in validMoves:
                    for value in validMoves[(i,j)]:
                        temp.append(value)

            tempSet = set(temp)
            for num in tempSet:
                colCount[j][num] = temp.count(num)

        # Blocks
        for i in range(0,3):
            for j in range(0,3):
                temp = []
                for row in range(i*3, i*3 +3):
                    for col in range(j*3, j*3 +3):
                        if (row, col) in validMoves:
                            for value in validMoves[(row, col)]:
                                temp.append(value)
                
                tempSet = set(temp)
                for num in tempSet:
                    blockCount[i*3 + j][num] = temp.count(num)
        
        for key in validMoves.keys():
            temp = []
            row = key[0]
            col = key[1]
            block = row//3 * 3 + col//3
            for value in validMoves[key]:
                freq = rowCount[row][value] + colCount[col][value] + blockCount[block][value]
                temp.append((value, freq))
            self.priorityDict[key] = sorted(temp, key=lambda x: x[1])



        



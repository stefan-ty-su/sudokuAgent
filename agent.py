from sudokuLayout import SudokuLayout

class SudokuAgent:

    def __init__(self, layout: SudokuLayout) -> None:
        
        self.layout = layout
        self.grid = layout.grid
        self.size = layout.gridSize

        self.rowCount = [dict() for i in range(self.size)]
        self.colCount = [dict() for i in range(self.size)]
        self.blockCount = [dict() for i in range(self.size)]
        self.priorityDict = dict()

    def orderValidMoves(self) -> bool:
        # Rows
        minimising = False
        for i in range(self.size):
            temp = []
            for j in range(self.size):
                if (i, j) in self.layout.validMoves:
                    for value in self.layout.validMoves[(i,j)]:
                        temp.append(value)
            
            tempSet = set(temp)
            for num in tempSet:
                count = temp.count(num)
                self.rowCount[i][num] = count

        # Cols
        for j in range(self.size):
            temp = []
            for i in range(self.size):
                if (i, j) in self.layout.validMoves:
                    for value in self.layout.validMoves[(i,j)]:
                        temp.append(value)

            tempSet = set(temp)
            for num in tempSet:
                count = temp.count(num)
                self.colCount[j][num] = count

        # Blocks
        for i in range(0,3):
            for j in range(0,3):
                temp = []
                for row in range(i*3, i*3 +3):
                    for col in range(j*3, j*3 +3):
                        if (row, col) in self.layout.validMoves:
                            for value in self.layout.validMoves[(row, col)]:
                                temp.append(value)
                
                tempSet = set(temp)
                for num in tempSet:
                    count = temp.count(num)
                    self.blockCount[i*3 + j][num] = count
        

        for i in range(self.size):
            for j in range(self.size):
                if (i, j) in self.layout.validMoves:
                    for value in self.layout.validMoves[(i, j)]:
                        if self.colCount[j][value] == 1 or self.rowCount[i][value] == 1 or self.blockCount[i//3*3 + j//3][value] == 1:
                            self.layout.playMove(i, j, value)
                            minimising = True
        if minimising:
            return minimising

        for key in self.layout.validMoves.keys():
            temp = []
            row = key[0]
            col = key[1]
            block = row//3 * 3 + col//3
            for value in self.layout.validMoves[key]:
                freq = self.rowCount[row][value] + self.colCount[col][value] + self.blockCount[block][value]
                temp.append((value, freq))
            self.priorityDict[key] = sorted(temp, key=lambda x: x[1])
        
        return minimising

    def backtrack(self) -> bool:

        minimising = True
        while minimising:
            minimising = self.orderValidMoves()

        return self.backtrackAux(0)

    def backtrackAux(self, index: int) -> bool:
        emptyList = list(self.layout.validMoves.keys())
        if index >= len(emptyList):
            return True

        pos = emptyList[index]
        row = pos[0]
        col = pos[1]

        for value, count in self.priorityDict[(row, col)]:
            if self.moveIsSafe(row, col, value):
                self.grid[row][col] = value
                if self.backtrackAux(index+1):
                    return True
            self.grid[row][col] = 0

        return False

    def moveIsSafe(self, row: int, col: int, num: int) -> bool:
        
        # Checking Rows
        for i in range(self.size):
            if self.grid[i][col] == num:
                return False
            
        # Checking Cols
        for j in range(self.size):
            if self.grid[row][j] == num:
                return False
        
        # Checking Squares
        sqxi = row//3 * 3
        sqyi = col//3 * 3
        for i in range(sqxi, sqxi+3):
            for j in range(sqyi, sqyi+3):
                if self.grid[i][j] == num:
                    return False

        return True



sa = [
    [5,3,0,0,7,0,0,0,0],
    [0,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
]

layout = SudokuLayout(sa)
agent = SudokuAgent(layout)
print(f'\nBefore: {agent.priorityDict}')
agent.backtrack()
print(f'\nAfter: {agent.priorityDict}')
print(agent.grid)
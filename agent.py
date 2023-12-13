from sudokuLayout import SudokuLayout

class SudokuAgent:

    def __init__(self, layout: SudokuLayout) -> None:
        
        self.layout = layout
        self.grid = layout.grid
        self.size = 9
        self.emptyList = list(self.layout.validMoves.keys())
    
    def backtrack(self) -> bool:
        return self.backtrackAux(0)

    def backtrackAux(self, index: int) -> bool:
        if index >= len(self.emptyList):
            return True

        pos = self.emptyList[index]
        row = pos[0]
        col = pos[1]

        for value in self.layout.validMoves[(row, col)]:
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
];

layout = SudokuLayout(sa)
agent = SudokuAgent(layout)
agent.backtrack()
print(agent.grid)
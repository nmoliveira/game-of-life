// By: Nuno Oliveira
// https://github.com/nmoliveira/game-of-life

// namespace
var GameOfLife = {};

// class to define a Cell
// @param x line
// @param y index on the line
GameOfLife.Cell = function (x, y) {
    // the current state of a cell
    this.active = new ko.observable(false);
    // the next state of the cell
    this.nextActive = false;
    this.x = x;
    this.y = y;
    this.liveNeighbours = 0;
}

// class to define a line
// @param Cell class to define a cell
// @param lineIndex the index of the line
// @param nCells number of cells on the line
GameOfLife.Line = function (Cell, lineIndex, nCells) {
    
    if (typeof Cell !== "function") {
        return null;
    }

    this.Cell = Cell;

    var i = 0;
    var line = { cells : [] };

    for (i; i < nCells; i++) {
        var cell = new this.Cell(lineIndex, i);
        line.cells.push(cell);
    }

    return line;
}

// class to define a game
// @param Line class to define lines
// @param Cell class to define cells
GameOfLife.Game = function(Line, Cell) {

    if (typeof Line !== "function") {
        return null;
    }

    if (typeof Cell !== "function") {
        return null;
    }

    var self = this;
    self.Line = Line;
    self.Cell = Cell;

    // define empty board
    self.board = { lines: new ko.observableArray([]) };

    // creates a board
    // @param nLines number of lines
    // @param nCells number of cells per line
    self.createBoard = function (nLines, nCells) {
        var i = 0;
        self.board.lines([]);
        var newLines = [];
        for (i; i < nLines; i++) {
            newLines.push(new self.Line(self.Cell, i, nCells));
        }
        self.board.lines(newLines);
    };
    
    // clears the board
    self.clearBoard = function () {
        var line = 0, cell;

        for (line; line < self.board.lines().length; line++) {
            for (cell = 0; cell < self.board.lines()[line].cells.length; cell++) {
                self.board.lines()[line].cells[cell].active(false);
            }
        }
    };

    // sets the next state of the board
    // Will go through all the cells and based on the live nighbours
    // and the rules will set the next state of each cell
    self.next = function () {
        var line = 0, cell, liveNeighbours;

        // first we need to set the next state with the values of the current state
        self.syncNextActives();

        // get live neighbours and set the next state on each cell
        for (line; line < self.board.lines().length; line++) {
            for (cell = 0; cell < self.board.lines()[line].cells.length; cell++) {
                
                var currentCell = self.board.lines()[line].cells[cell];
                liveNeighbours = self.getLiveNeighbours(currentCell.x, currentCell.y);

                if (liveNeighbours < 2) {
                    currentCell.nextActive = false;
                }

                if (liveNeighbours > 3) {
                    currentCell.nextActive = false;
                }

                if (liveNeighbours === 3) {
                    currentCell.nextActive = true;
                }

            }
        }

        // sync current state with the next one
        self.syncActives();

    };

    // Sets the next state with the value of the current state on each cell
    self.syncNextActives = function () {
        var line = 0, cell;

        for (line; line < self.board.lines().length; line++) {
            for (cell = 0; cell < self.board.lines()[line].cells.length; cell++) {
                
                var currentCell = self.board.lines()[line].cells[cell];
                currentCell.nextActive = currentCell.active();
            }
        }
    };

    // Sets the current state with the value of the next state on each cell
    self.syncActives = function () {
        var line = 0, cell;

        for (line; line < self.board.lines().length; line++) {
            for (cell = 0; cell < self.board.lines()[line].cells.length; cell++) {
                
                var currentCell = self.board.lines()[line].cells[cell];
                currentCell.active(currentCell.nextActive);
            }
        }
    };

    // counts the live neighbours of a cell
    // @param x line index
    // @param y cell index on the line 
    self.getLiveNeighbours = function (x, y) {

        var previousLine = self.board.lines()[x - 1],
            currentLine = self.board.lines()[x],
            nextLine = self.board.lines()[x + 1]; 

        return self.getLiveNeighboursFromLine(previousLine, y) 
            + self.getLiveNeighboursFromLine(currentLine, y, true)
            + self.getLiveNeighboursFromLine(nextLine, y);

    };

    // counts the live neighbours from a line
    // @param line the line
    // @param y the cell index
    // @param currentLine boolean to specify if is the current line
    // if true does not count itself
    self.getLiveNeighboursFromLine = function (line, y, currentLine) {

        var total = 0;
        
        total += line && line.cells[y -1] ? +!!line.cells[y -1].active() : 0;
        total += line && !currentLine ? +!!line.cells[y].active() : 0;
        total += line && line.cells[y + 1] ? +!!line.cells[y + 1].active() : 0;

        return total;
    }

}
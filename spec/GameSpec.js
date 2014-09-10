describe("Cells", function () {

    it("Should be able to create cells", function () {
        var cell = new GameOfLife.Cell(0, 0);
        expect(cell).toBeTruthy();
    })

});

describe("Lines", function () {

    it("Should be able to create lines", function () {
        var line = GameOfLife.Line(GameOfLife.Cell, 0, 1);
        expect(line).toBeTruthy();
    })

});

describe("Game of Life", function () {

    var game;

    beforeEach(function () {
        game = new GameOfLife.Game(GameOfLife.Line, GameOfLife.Cell);
    });

    it("Should exist", function () {
        expect(game).toBeDefined();
    });

    it("Should be able to define an initial board", function () {
        game.createBoard(3, 3);

        // number of lines should be 3
        expect(game.board.lines().length).toEqual(3);

        // number of cells per line should be 3
        expect(game.board.lines()[0].cells.length).toEqual(3);
        expect(game.board.lines()[1].cells.length).toEqual(3);
        expect(game.board.lines()[2].cells.length).toEqual(3);
    });

    it("Should be able to clear the board", function () {
        game.createBoard(3, 3);
        
        // initial state
        // [1,1,1]
        // [1,1,1]
        // [1,1,1]

        game.board.lines()[0].cells[0].active(true);
        game.board.lines()[0].cells[1].active(true);
        game.board.lines()[0].cells[2].active(true);
        game.board.lines()[1].cells[0].active(true);
        game.board.lines()[1].cells[1].active(true);
        game.board.lines()[1].cells[2].active(true);
        game.board.lines()[2].cells[0].active(true);
        game.board.lines()[2].cells[1].active(true);
        game.board.lines()[2].cells[2].active(true);

        game.clearBoard();

        // final state
        // [0,0,0]
        // [0,0,0]
        // [0,0,0]

        expect(game.board.lines()[0].cells[0].active()).toEqual(false);
        expect(game.board.lines()[0].cells[1].active()).toEqual(false);
        expect(game.board.lines()[0].cells[2].active()).toEqual(false);
        expect(game.board.lines()[1].cells[0].active()).toEqual(false);
        expect(game.board.lines()[1].cells[1].active()).toEqual(false);
        expect(game.board.lines()[1].cells[2].active()).toEqual(false);
        expect(game.board.lines()[2].cells[0].active()).toEqual(false);
        expect(game.board.lines()[2].cells[1].active()).toEqual(false);
        expect(game.board.lines()[2].cells[2].active()).toEqual(false);
    });

    it("Should count the number of alive neighbours", function () {
        game.createBoard(3, 3);

        // initial state
        // [0,0,0]
        // [1,1,1]
        // [0,0,0]

        game.board.lines()[1].cells[0].active(true);
        game.board.lines()[1].cells[1].active(true);
        game.board.lines()[1].cells[2].active(true);

        expect(game.getLiveNeighbours(0, 0)).toEqual(2);
        expect(game.getLiveNeighbours(0,1)).toEqual(3);
        expect(game.getLiveNeighbours(0,2)).toEqual(2);
        expect(game.getLiveNeighbours(1,0)).toEqual(1);
        expect(game.getLiveNeighbours(1,1)).toEqual(2);
        expect(game.getLiveNeighbours(1,2)).toEqual(1);
        expect(game.getLiveNeighbours(2,0)).toEqual(2);
        expect(game.getLiveNeighbours(2,1)).toEqual(3);
        expect(game.getLiveNeighbours(2,2)).toEqual(2);

    });

    it("Should create Blinker pattern", function () {
        
        // The initial pattern for Blinker
        // [0,0,0]
        // [1,1,1]
        // [0,0,0]
        
        game.createBoard(3, 3);
        
        game.board.lines()[1].cells[0].active(true);
        game.board.lines()[1].cells[1].active(true);
        game.board.lines()[1].cells[2].active(true);

        game.next();

        // The next  state
        // [0,1,0]
        // [0,1,0]
        // [0,1,0]
        expect(game.board.lines()[0].cells[0].active()).toEqual(false);
        expect(game.board.lines()[0].cells[1].active()).toEqual(true);
        expect(game.board.lines()[0].cells[2].active()).toEqual(false);
        expect(game.board.lines()[1].cells[0].active()).toEqual(false);
        expect(game.board.lines()[1].cells[1].active()).toEqual(true);
        expect(game.board.lines()[1].cells[2].active()).toEqual(false);
        expect(game.board.lines()[2].cells[0].active()).toEqual(false);
        expect(game.board.lines()[2].cells[1].active()).toEqual(true);
        expect(game.board.lines()[2].cells[2].active()).toEqual(false);

    });

    it("Should create Toad pattern", function () {

        // The initial pattern for Toad
        // [0,0,0,0]
        // [0,1,1,1]
        // [1,1,1,0]
        // [0,0,0,0]
        
        game.createBoard(4, 4);
        
        game.board.lines()[1].cells[1].active(true);
        game.board.lines()[1].cells[2].active(true);
        game.board.lines()[1].cells[3].active(true);
        game.board.lines()[2].cells[0].active(true);
        game.board.lines()[2].cells[1].active(true);
        game.board.lines()[2].cells[2].active(true);

        game.next();

        // The next  state
        // [0,0,1,0]
        // [1,0,0,1]
        // [1,0,0,1]
        // [0,1,0,0]

        expect(game.board.lines()[0].cells[0].active()).toEqual(false);
        expect(game.board.lines()[0].cells[1].active()).toEqual(false);
        expect(game.board.lines()[0].cells[2].active()).toEqual(true);
        expect(game.board.lines()[0].cells[3].active()).toEqual(false);
        expect(game.board.lines()[1].cells[0].active()).toEqual(true);
        expect(game.board.lines()[1].cells[1].active()).toEqual(false);
        expect(game.board.lines()[1].cells[2].active()).toEqual(false);
        expect(game.board.lines()[1].cells[3].active()).toEqual(true);
        expect(game.board.lines()[2].cells[0].active()).toEqual(true);
        expect(game.board.lines()[2].cells[1].active()).toEqual(false);
        expect(game.board.lines()[2].cells[2].active()).toEqual(false);
        expect(game.board.lines()[2].cells[3].active()).toEqual(true);
        expect(game.board.lines()[3].cells[0].active()).toEqual(false);
        expect(game.board.lines()[3].cells[1].active()).toEqual(true);
        expect(game.board.lines()[3].cells[2].active()).toEqual(false);
        expect(game.board.lines()[3].cells[3].active()).toEqual(false);

    });

    it("Should create Beacon pattern", function () {
        
        // initial state for Beacon
        // [1,1,0,0]
        // [1,1,0,0]
        // [0,0,1,1]
        // [0,0,1,1]

        game.createBoard(4, 4);

        game.board.lines()[0].cells[0].active(true);
        game.board.lines()[0].cells[1].active(true);
        game.board.lines()[1].cells[0].active(true);
        game.board.lines()[1].cells[1].active(true);
        game.board.lines()[2].cells[2].active(true);
        game.board.lines()[2].cells[3].active(true);
        game.board.lines()[3].cells[2].active(true);
        game.board.lines()[3].cells[3].active(true);

        game.next();

        // final state
        // [1,1,0,0]
        // [1,0,0,0]
        // [0,0,0,1]
        // [0,0,1,1]

        expect(game.board.lines()[0].cells[0].active()).toEqual(true);
        expect(game.board.lines()[0].cells[1].active()).toEqual(true);
        expect(game.board.lines()[0].cells[2].active()).toEqual(false);
        expect(game.board.lines()[0].cells[3].active()).toEqual(false);
        expect(game.board.lines()[1].cells[0].active()).toEqual(true);
        expect(game.board.lines()[1].cells[1].active()).toEqual(false);
        expect(game.board.lines()[1].cells[2].active()).toEqual(false);
        expect(game.board.lines()[1].cells[3].active()).toEqual(false);
        expect(game.board.lines()[2].cells[0].active()).toEqual(false);
        expect(game.board.lines()[2].cells[1].active()).toEqual(false);
        expect(game.board.lines()[2].cells[2].active()).toEqual(false);
        expect(game.board.lines()[2].cells[3].active()).toEqual(true);
        expect(game.board.lines()[3].cells[0].active()).toEqual(false);
        expect(game.board.lines()[3].cells[1].active()).toEqual(false);
        expect(game.board.lines()[3].cells[2].active()).toEqual(true);
        expect(game.board.lines()[3].cells[3].active()).toEqual(true);

    });

});
// Class for rendering the game
// @param game instance of the Game class
function GameRender(game) {
    
    "strict mode";

    self = this;

    // some properties

    self.game = game;
    self.timer = null;
    self.interval = new ko.observable(500);
    self.helpVisible = new ko.observable(false);
    self.boardSize = new ko.observable("12 x 12");
    // inititialization
    // creates the board 12 lines by 12 cells 
    self.init = function () {

        var size = parseInt(self.boardSize().substring(0,2), 10);
        self.game.createBoard(size, size);

        ko.applyBindings(self);

    };

    // activate/deactivate a cell
    // @param cell selected
    self.toggleCellStatus = function (cell) {
        cell.active(!cell.active());
    };

    // show/hide help panel 
    self.toogleHelp = function () {
        self.helpVisible(!self.helpVisible());
    };    

    // start game
    // sets an interval to call the next state of the board
    self.start = function () {
        if (!self.timer) {
            self.timer = setInterval(self.step, parseInt(self.interval()));
        }
    };

    // next state of the board
    self.step = function () {
        self.game.next();
    };

    // stop timer
    self.stop = function () {
        self.timer = clearInterval(self.timer);
    };

    // clear board and timer
    self.clear = function () {
        self.game.clearBoard();
        self.timer = clearInterval(self.timer);
    };

    // selected predefined pattern from  the list
    self.onChangePattern = function (obj, event) {
        var pattern = event.currentTarget.value;
        self.setPattern(pattern);
    };

    // selected a different board size
    self.onChangeBoardSize = function (obj, event) {
        self.clear();
        var size = parseInt(self.boardSize().substring(0,2), 10);
        self.game.createBoard(size, size);
    };

    // set a predefined pattern on the board
    // @param pattern name of the pattern
    self.setPattern = function (pattern) {

        self.clear();
        
        if (pattern === "blinker") {

            game.board.lines()[5].cells[4].active(true);
            game.board.lines()[5].cells[5].active(true);
            game.board.lines()[5].cells[6].active(true);

        } else if (pattern === "toad") {

            game.board.lines()[4].cells[5].active(true);
            game.board.lines()[4].cells[6].active(true);
            game.board.lines()[4].cells[7].active(true);
            game.board.lines()[5].cells[4].active(true);
            game.board.lines()[5].cells[5].active(true);
            game.board.lines()[5].cells[6].active(true);

        } else if (pattern === "beacon") {

            game.board.lines()[3].cells[4].active(true);
            game.board.lines()[3].cells[5].active(true);
            game.board.lines()[4].cells[4].active(true);
            game.board.lines()[4].cells[5].active(true);
            game.board.lines()[5].cells[6].active(true);
            game.board.lines()[5].cells[7].active(true);
            game.board.lines()[6].cells[6].active(true);
            game.board.lines()[6].cells[7].active(true);
        
        } else if (pattern === "pulsar") {

            game.board.lines()[4].cells[5].active(true);
            game.board.lines()[4].cells[6].active(true);
            game.board.lines()[5].cells[4].active(true);
            game.board.lines()[5].cells[5].active(true);
            game.board.lines()[6].cells[5].active(true);

        } else if (pattern === "square") {

            game.board.lines()[4].cells[4].active(true);
            game.board.lines()[4].cells[5].active(true);
            game.board.lines()[4].cells[6].active(true);
            game.board.lines()[5].cells[4].active(true);
            game.board.lines()[5].cells[6].active(true);
            game.board.lines()[6].cells[4].active(true);
            game.board.lines()[6].cells[5].active(true);
            game.board.lines()[6].cells[6].active(true);
        }


    };

}  
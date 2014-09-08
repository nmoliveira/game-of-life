######HTML5 Conway's Game of Life


The "game" is a zero-player game, meaning that its evolution is determined by its initial configuration and does not require any other input. You can setup an initial configuration by clicking on the cells or  selecting one of the predefined patterns. After configuring the initial pattern, just hit start and see the game evolving. You can set the time between each iteration, the lower the interval the faster it evolves. 

There are only 4 rules that determines how the game evolves:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.</li>
2. Any live cell with two or three live neighbours lives on to the next generation.</li>
3. Any live cell with more than three live neighbours dies, as if by overcrowding.</li>
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>

######Technologies
* Javascript
* Knockout
* Jasmine

[Game of Life on Wikipedia](http://en.wikipedia.org/wiki/Conway's_Game_of_Life)

[Demo](http://nunooliveira.me/games/game-of-life)
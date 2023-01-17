# About

This example is a simple web app implementation of the Game of Life .

In a grid every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At
each step in time, the following transitions occur:
1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

# The App UI
Grid containing the cells alive or dead state.
 1. You can start simulation with the start button.
 2. To stop simulation click the stop button.
 3. To create random occurrences of dead and alive cells click the random button.
 4. To clear the grid click the clear button.
 5. You can create custom death and alive cells by clicking the grid cell.

# How to Run
1. Run command `npm install` in project directory to install dependencies
2. To start server, run command `npm run start` while in project directory

# The Files
* package.json - dependencies required for `npm install`
* Home.jsx - component creating UI for the app containing the Grid, buttons and methods.
* Home.css- styles for Home.jsx component
* useInterval.jsx - custom hook to set the time interval to run simulation.
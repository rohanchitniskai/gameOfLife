import { useState, useRef, useEffect } from "react";
import useInterval from "./useInterval";
import "./Home.css";

const Home = () => {
  /* state to set grid */
  const [grid, setGrid] = useState();

  /* running state of a grid simulation */
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  /* number of rows in grid */
  const numRows = 25;

  /* number of columns in grid */
  const numCols = 35;

  useEffect(() => {
    /* initialize the grid */
    setGrid(initializeGrid());
  }, []);

  /* initialize the grid with static live and dead cells specifying the index of row and column 
  1 - alive cells
  0 - dead cells 
  create two dimensional array */
  const initializeGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), (ele, colIndex) =>
          (i === 1 && colIndex === 7) ||
          (i === 2 && colIndex === 8) ||
          (i === 3 && (colIndex === 6 || colIndex === 7 || colIndex === 8))
            ? 1
            : 0
        )
      );
    }
    return rows;
  };

  /* generate empty grid all cells are dead 
  0 - dead cells  */
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  /* generate random dead and alive cells on click of random button  */
  const randomCells = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    return rows;
  };

  /* make cell alive or dead on cell click */
  const onCellClick = (gridIndex, rowIndex) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[gridIndex][rowIndex] = grid[gridIndex][rowIndex] ? 0 : 1;
    setGrid(newGrid);
  };

  /* co-ordinates to get surrounding neighbors of the cell  */
  const cellNeighbors = [
    [-1, -1], //top left corner
    [0, -1], // top
    [1, -1], // top right corner
    [-1, 0], //left
    [1, 0], // right
    [-1, 1], // bottom left
    [0, 1], // bottom
    [1, 1], // bottom right
  ];

  /* run iteration to generate cells on grid */
  const runSimulation = (grid) => {
    if (!runningRef.current) {
      return;
    }

    let gridCopy = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let neighbors = 0;

        /* find neighbors of the cell */
        cellNeighbors.forEach(([x, y]) => {
          const xCord = i + x;
          const yCord = j + y;
          if (xCord >= 0 && xCord < numRows && yCord >= 0 && yCord < numCols) {
            neighbors += grid[xCord][yCord];
          }
        });

        /* apply game conditions on the cell to make it alive or dead 
            1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
            2. Any live cell with two or three live neighbors lives on to the next generation.
            3. Any live cell with more than three live neighbors dies, as if by overcrowding.
            4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. */
        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }
    setGrid(gridCopy);
  };

  /* set interval hook to run simulation */
  useInterval(() => {
    runSimulation(grid);
  }, 1000);

  return (
    <div>
      <h1 className="title">Game of Life</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {grid &&
          grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => onCellClick(i, k)}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? "#F68E5F" : undefined,
                  border: "1px solid #595959",
                }}
              ></div>
            ))
          )}
      </div>

      <div className="btn-container">
        <button
          className="button"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
            }
          }}
        >
          <span>{running ? "Stop" : "Start"}</span>
        </button>

        <button
          className="button"
          onClick={() => {
            setGrid(randomCells());
          }}
        >
          <span>Random</span>
        </button>

        <button
          className="button"
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          <span>Clear</span>
        </button>

        <button
          className="button"
          onClick={() => {
            setGrid(initializeGrid());
          }}
        >
          <span>Restart</span>
        </button>
      </div>
    </div>
  );
};

export default Home;

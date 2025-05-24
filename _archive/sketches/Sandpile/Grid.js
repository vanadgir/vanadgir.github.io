class Grid {
  // set dimensions of grid
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.cells = [];
    for (let i = 0; i < this.rows; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j] = new Cell(i * cellWidth, j * cellWidth);
      }
    }
  }

  // show cells
  render() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j].render();
      }
    }
  }

  // calculate new sand levels
  topple() {
    let newSandLevels = [];

    // first pass
    for (let i = 0; i < this.rows; i++) {
      newSandLevels[i] = [];
      for (let j = 0; j < this.columns; j++) {
        newSandLevels[i][j] = this.cells[i][j].getSandLevel();
      }
    }

    // second pass
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let num = this.cells[i][j].getSandLevel();
        if (num > CELL_MAXIMUM) {
          newSandLevels[i][j] -= 4;
          if (i + 1 < this.rows) newSandLevels[i + 1][j]++;
          if (i - 1 >= 0) newSandLevels[i - 1][j]++;
          if (j + 1 < this.columns) newSandLevels[i][j + 1]++;
          if (j - 1 >= 0) newSandLevels[i][j - 1]++;
        }
      }
    }

    // update cells
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j].setSandLevel(newSandLevels[i][j]);
      }
    }
  }

  // drop sand at location
  dropSand(x, y, amt) {
    this.cells[x][y].setSandLevel(amt);
  }

  // click event
  clicked() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j].clicked();
      }
    }
  }

  // grid reset method
  resetGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j].setSandLevel(0);
      }
    }

    this.dropSand(Math.floor(rows / 2), Math.floor(columns / 2), INITIAL_SAND);
  }
}

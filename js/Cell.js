class Cell {
  constructor(value) {
    // is collapsed?
    this.collapsed = false;

    // initial options
    if (value instanceof Array) {
      this.options = value;
    } else {
      // or all options to start
      this.options = [];
      for (let i = 0; i < value; i++) {
        this.options[i] = i;
      }
    }
  }
}

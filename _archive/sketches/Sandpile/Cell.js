class Cell {
  // set center of cell
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sandLevel = 0;
    this.col = color(0);
    this.inXBounds = false;
    this.inYBounds = false;
  }

  // render method
  render(){
    // change color depending on level
    switch(this.sandLevel){
      case 0:
        this.col = color(0); // black
        break;
      case 1:
        this.col = color(0, 105, 148); // blue
        break;
      case 2:
        this.col = color(194, 178, 98); // beige
        break;
      case 3:
        this.col = color(139, 69, 19); // brown
        break;
      case 4:
        this.col = color(34, 139, 34); // green
        break;
      case 5:
        this.col = color(112, 128, 144); // gray
        break;
      }
      
    // overflowing cells fill white
    if (this.sandLevel > CELL_MAXIMUM){
      this.col = color(255); // white
    }

    // hovered cells fill white
    if (this.isHovered() & activeClick) {
      this.col = color(255); // white
    }

    // fill and draw rect
    fill(this.col);
    rect(this.x, this.y, cellWidth, cellWidth);
  }

  // get method
  getSandLevel(){
    return this.sandLevel;
  }

  // set method
  setSandLevel(level){
    this.sandLevel = level;
  }

  // increment method
  incrementSand(){
    this.sandLevel += 1;
  }

  // mouse hover check
  isHovered(){
    this.inXBounds = ((mouseX > this.x - cellWidth/2) && (mouseX <= this.x + cellWidth/2));
    this.inYBounds = ((mouseY > this.y - cellWidth/2) && (mouseY <= this.y + cellWidth/2));
    return this.inXBounds & this.inYBounds;
  }
  
  // click event
  clicked(){
    if (this.isHovered()) {
      this.sandLevel += DROP_WHEN_CLICKED;
    }
  }
}


/*
 * Utility enums and functions for game play.
 * These are not visual components.
 */
class Util {
  /*
   * Describes the visual state of a square on the board.
   */
  static DrawStateEnum = {
    COVERED: 1,      // all squares are covered at game start
    FLAGGED: 2,      // user may flag suspected mines
    UNCOVERED: 3,    // square is showing what it has in it
    EXPLODED: 4      // square was the mine that user clicked for loss
  };

  /*
   * Creates a new game board of the given size and number of mines.
   * Returns a two-dimensional array of objects that describe the squares.
   */
  static createBoard(width, height, numMines) {
    // create grid of empty squares
    let result = Array(height).fill(null);
    for (let row = 0; row < height; row++) {
      result[row] = Array(width).fill(null);
      for (let col = 0; col < width; col++) {
        result[row][col] = {
          isMine: false,
          drawState: Util.COVERED,
          numNearbyMines: 0
        }
      }
    }
    // plant the mines
    let planted = 0;
    while (planted < numMines) {
      let x = Math.trunc(Math.random() * width);
      let y = Math.trunc(Math.random() * height);
      if (!result[y][x].isMine) {
        result[y][x].isMine = true;
        for (let row = y - 1; row <= y + 1; row++) {
          if (row >= 0 && row < height) {
            for (let col = x - 1; col <= x + 1; col++) {
              if (col >= 0 && col < width && (col !== x || row !== y)) {
                result[row][col].numNearbyMines++;
              }
            }
          }
        }
        planted++;
      }
    }
    return result;
  }

}

export default Util;

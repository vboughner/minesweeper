import React, { Component } from 'react';
import Remainder from './Remainder';
import Timer from './Timer';
import Board from './Board';
import Util from '../Util';
import './index.css';

class PlayArea extends Component {
  static GRID_WIDTH = 9;
  static GRID_HEIGHT = 9;
  static NUM_MINES = 10;
  static REVEAL_DELAY_MS = 50;
  static REVEAL_NUM_MINES = 2;

  constructor(props) {
    super(props);
    this.state = {
      width: PlayArea.GRID_WIDTH,
      height: PlayArea.GRID_HEIGHT,
      numMines: PlayArea.NUM_MINES,
      numFlags: 0,
      squares: Util.createBoard(PlayArea.GRID_WIDTH, PlayArea.GRID_HEIGHT, PlayArea.NUM_MINES),
      startTime: null,
      endTime: null
    };
  }

  // copies a two-dimensional array of squares, useful before changing the board
  copySquares(squares) {
    let updateSquares = [];
    for (let i = 0; i < squares.length; i++) {
      updateSquares[i] = squares[i].slice();
    }
    return updateSquares;
  }

  // call this to start the timer as soon as the user clicks for the first time
  startTheClock() {
    if (!this.state.startTime) {
      this.setState({startTime: Date.now()});
    }
  }

  // adds to a queue of all squares that are unrevealed near the given square,
  // does not repeat the addition of any squares in the queue,
  // keeps a hash map while generating the queue to quickly check against
  addSurroundingSquaresToQueue(squareQueue, squareMap, row, col) {
    let squareHash = row + ',' + col;
    if (!this.state.squares[row][col].isMine && !squareMap[squareHash]) {
      squareQueue.push({
        row: row,
        col: col
      });
      squareMap[squareHash] = true;
      if (!this.state.squares[row][col].numNearbyMines) {
        for (let r = row - 1; r <= row + 1; r++) {
          if (r >= 0 && r < PlayArea.GRID_HEIGHT) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (c >= 0 && c < PlayArea.GRID_WIDTH && (r !== row || c !== col)) {
                this.addSurroundingSquaresToQueue(squareQueue, squareMap, r, c);
              }
            }
          }
        }
      }
    }
  }

  // sets a timeout for uncovering squares from the queue, will uncover a certain number
  // of squares after a time, and set the rest to be uncovered gradually in batches later
  setTimeoutForUncovering(squareQueue) {
    if (squareQueue.length > 0) {
      let uncoverNext = squareQueue.slice(0, PlayArea.REVEAL_NUM_MINES);
      let uncoverLater = squareQueue.slice(PlayArea.REVEAL_NUM_MINES);
      setTimeout(() => {
        let updatedSquares = this.copySquares(this.state.squares);
        for (let i = 0; i < uncoverNext.length; i++) {
          updatedSquares[uncoverNext[i].row][uncoverNext[i].col].drawState = Util.DrawStateEnum.UNCOVERED;
        }
        this.setState({squares: updatedSquares});

        if (uncoverLater) {
          this.setTimeoutForUncovering(uncoverLater);
        }
      }, PlayArea.REVEAL_DELAY_MS);
    }
  }

  // when a square is blank, look to uncover more squares around it, after a time (i.e. animation),
  // make a list of all the squares to uncover, and then set up an animation to uncover them over time
  uncoverSurroundingSquaresAfterTime(row, col) {
    let squareQueue = [];
    let squareMap = Object.create(null);
    this.addSurroundingSquaresToQueue(squareQueue, squareMap, row, col);
    this.setTimeoutForUncovering(squareQueue);
  }

  // left-click uncovers covered squares, and may result is game win or loss
  handleClick(row, col) {
    this.startTheClock();
    let squareState = this.state.squares[row][col].drawState;
    if (squareState === Util.DrawStateEnum.COVERED) {
      this.uncoverSurroundingSquaresAfterTime(row, col);

      // TODO: add logic to determine if game has been won or lost

      // TODO: is the following really needed after the uncover surrounding function is called?
      let updatedSquares = this.copySquares(this.state.squares);
      updatedSquares[row][col].drawState = Util.DrawStateEnum.UNCOVERED;
      this.setState({squares: updatedSquares});
    }
  }

  // right-click flags the covered squares, unflags flagged squares, and has no effect on uncovered squares
  handleContextMenu(row, col) {
    this.startTheClock();
    let squareState = this.state.squares[row][col].drawState;
    if (squareState === Util.DrawStateEnum.COVERED || squareState === Util.DrawStateEnum.FLAGGED) {
      let updatedSquares = this.copySquares(this.state.squares);
      let updatedNumFlags = this.state.numFlags;

      if (squareState === Util.DrawStateEnum.COVERED) {
        updatedSquares[row][col].drawState = Util.DrawStateEnum.FLAGGED;
        updatedNumFlags++;
      }
      else {
        updatedSquares[row][col].drawState = Util.DrawStateEnum.COVERED;
        updatedNumFlags--;
      }

      this.setState({
        squares: updatedSquares,
        numFlags: updatedNumFlags
      });
    }
  }

  render() {
    return (
      <div className="play-area">
        <Remainder
          numMines={this.state.numMines}
          numFlags={this.state.numFlags}
        />
        <Board
          width={this.state.width}
          height={this.state.height}
          squares={this.state.squares}
          onClick={(row, col) => this.handleClick(row, col)}
          onContextMenu={(row, col) => this.handleContextMenu(row, col)}
        />
        <Timer
          startTime={this.state.startTime}
        />
      </div>
    );
  }
}

export default PlayArea;

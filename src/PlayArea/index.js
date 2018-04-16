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

  // left-click uncovers covered squares, and may result is game win or loss
  handleClick(row, col) {
    this.startTheClock();
    let squareState = this.state.squares[row][col].drawState;
    if (squareState === Util.DrawStateEnum.COVERED) {
      let updatedSquares = this.copySquares(this.state.squares);
      updatedSquares[row][col].drawState = Util.DrawStateEnum.UNCOVERED;

      // TODO: add logic to determine if more squares should be uncovered
      // TODO: add logic to determine if game has been won or lost

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

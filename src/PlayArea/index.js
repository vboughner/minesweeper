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
      startTime: Date.now()
    };
  }

  handleClick(row, col) {
    console.log('left clicked on row = ' + row + ' and col = ' + col);
  }

  handleContextMenu(row, col) {
    let currentState = this.state.squares[row][col].drawState;
    if (currentState === Util.DrawStateEnum.COVERED || currentState === Util.DrawStateEnum.FLAGGED) {
      let updatedSquares = this.state.squares.slice();
      updatedSquares[row][col].drawState =
        currentState === Util.DrawStateEnum.COVERED ? Util.DrawStateEnum.FLAGGED : Util.DrawStateEnum.COVERED;
      this.setState({squares: updatedSquares});
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

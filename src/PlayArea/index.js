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
      squares: Util.createBoard(Util.GRID_WIDTH, Util.GRID_HEIGHT, Util.NUM_MINES),
      startTime: Date.now()
    };
  }

  handleClick(row, col) {
    console.log('clicked on row = ' + row + ' and col = ' + col);
  }

  render() {
    return (
      <div className="play-area">
        <p>START PLAY AREA</p>
        <Remainder
          numMines={this.state.numMines}
          numFlags={this.state.numFlags}
        />
        <Timer
          startTime={this.state.startTime}
        />
        <Board
          squares={this.state.squares}
          onClick={(row, col) => this.handleClick(row, col)}
        />
        <p>END PLAY AREA</p>
      </div>
    );
  }
}

export default PlayArea;

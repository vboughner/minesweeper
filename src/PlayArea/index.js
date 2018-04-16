import React, { Component } from 'react';
import Remainder from './Remainder';
import Setup from './Setup';
import Timer from './Timer';
import Status from './Status';
import Board from './Board';
import Util from '../Util';
import './index.css';

class PlayArea extends Component {
  static GRID_WIDTH = 9;
  static GRID_HEIGHT = 9;
  static NUM_MINES = 10;
  static REVEAL_DELAY_MS = 30;
  static REVEAL_NUM_MINES = 2;
  static INITIAL_DIFFICULTY = 2;    // 1 = easy, 2 = medium, 3 = hard

  constructor(props) {
    super(props);
    this.state = {
      width: PlayArea.GRID_WIDTH,
      height: PlayArea.GRID_HEIGHT,
      numMines: PlayArea.NUM_MINES,
      difficulty: PlayArea.INITIAL_DIFFICULTY,
      coveredSafeSquares: PlayArea.GRID_WIDTH * PlayArea.GRID_HEIGHT - PlayArea.NUM_MINES,
      numFlags: 0,
      squares: Util.createBoard(PlayArea.GRID_WIDTH, PlayArea.GRID_HEIGHT, PlayArea.NUM_MINES),
      startTime: null,
      endTime: null
    };
  }

  // restarts the game, given a new difficulty level
  restartGame(difficulty) {
    console.log('restart, difficult is ' + difficulty);
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

  // call this to stop the time when we have won or lost
  stopTheClock() {
    this.setState({endTime: Date.now()});
  }

  // adds to a queue of all squares that are unrevealed near the given square,
  // does not repeat the addition of any squares in the queue,
  // keeps a hash map while generating the queue to quickly check against,
  // note that only COVERED squares should be uncovered, not FLAGGED squares
  addSurroundingSquaresToQueue(squareQueue, squareMap, row, col) {
    if (this.state.squares[row][col].drawState === Util.DrawStateEnum.COVERED) {
      let squareHash = row + ',' + col;
      if (!squareMap[squareHash]) {
        squareQueue.push({
          row: row,
          col: col
        });
        squareMap[squareHash] = true;
        if (!this.state.squares[row][col].isMine && !this.state.squares[row][col].numNearbyMines) {
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
  }

  // uncovers all remaining squares after a win or loss
  uncoverAllRemainingSquares() {
    let updatedSquares = this.copySquares(this.state.squares);
    for (let row = 0; row < PlayArea.GRID_HEIGHT; row++) {
      for (let col = 0; col < PlayArea.GRID_WIDTH; col++) {
        let square = updatedSquares[row][col];
        if (square.drawState === Util.DrawStateEnum.COVERED || square.drawState === Util.DrawStateEnum.FLAGGED) {
          square.drawState = Util.DrawStateEnum.UNCOVERED;
        }
      }
    }
    this.setState({
      squares: updatedSquares,
      coveredSafeSquares: 0,
      numFlags: 0
    });
  }

  endTheGame() {
    this.stopTheClock();
    this.uncoverAllRemainingSquares();
  }

  // sets a timeout for uncovering squares from the queue, will uncover a
  // certain number of squares after a time, and set the rest to be
  // uncovered later (by calling this function again to set a timeout,
  // repeats until all squares in queue are uncovered)
  setTimeoutForUncovering(squareQueue) {
    if (squareQueue.length > 0) {
      let uncoverNext = squareQueue.slice(0, PlayArea.REVEAL_NUM_MINES);
      let uncoverLater = squareQueue.slice(PlayArea.REVEAL_NUM_MINES);
      setTimeout(() => {
        let updatedSquares = this.copySquares(this.state.squares);
        let updatedCoveredSafeSquares = this.state.coveredSafeSquares;
        for (let i = 0; i < uncoverNext.length; i++) {
          let square = updatedSquares[uncoverNext[i].row][uncoverNext[i].col];
          if (square.isMine) {
            square.drawState = Util.DrawStateEnum.EXPLODED;
            this.endTheGame();
          }
          else {
            square.drawState = Util.DrawStateEnum.UNCOVERED;
            updatedCoveredSafeSquares--;
            if (updatedCoveredSafeSquares === 0) {
              this.endTheGame();
            }
          }
        }
        this.setState({
          squares: updatedSquares,
          coveredSafeSquares: updatedCoveredSafeSquares
        }, () => {
          if (uncoverLater) {
            this.setTimeoutForUncovering(uncoverLater);
          }
        });
      }, PlayArea.REVEAL_DELAY_MS);
    }
  }

  // when a square is blank, look to uncover more squares around it,
  // after a time (i.e. animation), this function makes a list of all squares
  // to uncover, then sets up an animation to uncover them over time
  uncoverSurroundingSquaresAfterTime(row, col) {
    let squareQueue = [];
    let squareMap = Object.create(null);
    this.addSurroundingSquaresToQueue(squareQueue, squareMap, row, col);
    this.setTimeoutForUncovering(squareQueue);
  }

  // left-click uncovers a square, and uncovering may result is game win or loss,
  // when a square is blank, tries to uncover other non-mine squares around it
  handleClick(row, col) {
    this.startTheClock();
    let squareState = this.state.squares[row][col].drawState;
    if (squareState === Util.DrawStateEnum.COVERED) {
      this.uncoverSurroundingSquaresAfterTime(row, col);
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
        <div className="play-area-right">
          <Remainder
            numMines={this.state.numMines}
            numFlags={this.state.numFlags}
          />
          <Setup
            onRestartGame={(difficulty) => this.restartGame(difficulty)}
            difficulty={this.state.difficulty}
          />
        </div>
        <Board
          width={this.state.width}
          height={this.state.height}
          squares={this.state.squares}
          onClick={(row, col) => this.handleClick(row, col)}
          onContextMenu={(row, col) => this.handleContextMenu(row, col)}
        />
        <div className="play-area-right">
          <Timer
            startTime={this.state.startTime}
            endTime={this.state.endTime}
          />
          <Status
            coveredSafeSquares={this.state.coveredSafeSquares}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
          />
        </div>
      </div>
    );
  }
}

export default PlayArea;

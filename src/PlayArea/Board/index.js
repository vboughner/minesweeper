import React, { Component } from 'react';
import Square from "./Square";
import './index.css';

class Board extends Component {
  render() {
    return (
      <div className="board">
        <p>START BOARD</p>
        <Square />
        <Square />
        <p>END BOARD</p>
      </div>
    );
  }
}

export default Board;

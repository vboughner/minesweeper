import React, { Component } from 'react';
import './index.css';

function Square(props) {
  let classNames = 'square';
  let displayText = 'S';
  return (
    <button className={classNames} onClick={props.onClick}>
      {displayText}
    </button>
  );
}

class Board extends Component {
  renderSquare(row, col) {
    return (
      <Square
        key={row + ',' + col}
        onClick={() => this.props.onClick(row, col)}
      />
    );
  }

  renderRow(row) {
    let columns = [];
    for (let col = 0; col < this.props.width; col++) {
      columns.push(this.renderSquare(row, col));
    }
    return (
      <div key={row} className='board-row'>
        {columns}
      </div>
    )
  }

  render() {
    let rows = [];
    for (let row = 0; row < this.props.height; row++) {
      rows.push(this.renderRow(row));
    }
    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}

export default Board;

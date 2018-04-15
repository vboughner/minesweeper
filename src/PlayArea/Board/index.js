import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Util from '../../Util';
import './index.css';

function Square(props) {
  let classNames = 'square';
  let displayText = '';

  if (props.square.drawState === Util.DrawStateEnum.UNCOVERED) {
    if (props.square.isMine) {
      displayText = 'M';
    }
    else if (props.square.numNearbyMines > 0) {
      displayText = props.square.numNearbyMines
    }
  }
  else if (props.square.drawState === Util.DrawStateEnum.FLAGGED) {
    displayText = 'F';
  }
  else if (props.square.drawState === Util.DrawStateEnum.EXPLODED) {
    displayText = 'E';
  }

  return (
    <button className={classNames} onClick={props.onClick} onContextMenu={props.onContextMenu}>
      {displayText}
    </button>
  );
}

class Board extends Component {
  renderSquare(row, col) {
    return (
      <Square
        key={row + ',' + col}
        square={this.props.squares[row][col]}
        onClick={() => this.props.onClick(row, col)}
        onContextMenu={(event) => {
          this.props.onContextMenu(row, col);
          event.preventDefault();
        }}
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

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  squares: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
};

export default Board;

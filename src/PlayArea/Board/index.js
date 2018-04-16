import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Util from '../../Util';
import './index.css';

// colors for text, in the squares near mines
const numberColors = [
  'blue',
  'green',
  'red',
  'purple',
  'darkorange',
  'brown',
  'magenta',
  'darkblue'
];

function Square(props) {
  let classNames = 'square';
  let displayText = '';
  let style = {};

  switch (props.square.drawState) {
    case Util.DrawStateEnum.COVERED:
      classNames += ' square-covered';
      break;

    case Util.DrawStateEnum.UNCOVERED:
      if (props.square.isMine) {
        classNames += ' square-mined';
        displayText = 'M';
      }
      else {
        classNames += ' square-uncovered';
        if (props.square.numNearbyMines > 0) {
          displayText = props.square.numNearbyMines;
          style.color = numberColors[props.square.numNearbyMines - 1];
        }
      }
      break;

    case Util.DrawStateEnum.FLAGGED:
      classNames += ' square-flagged';
      displayText = 'F';
      break;

    case Util.DrawStateEnum.EXPLODED:
      classNames += ' square-exploded';
      displayText = 'E';
      break;

    default:
      console.error('error: unknown case for draw state: ' + props.square.drawState);
  }

  return (
    <button className={classNames} style={style} onClick={props.onClick} onContextMenu={props.onContextMenu}>
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

import React, { Component } from 'react';
import Remainder from './Remainder';
import Timer from './Timer';
import Board from './Board';
import './index.css';

class PlayArea extends Component {
  render() {
    return (
      <div className="play-area">
        <p>START PLAY AREA</p>
        <Remainder />
        <Timer />
        <Board />
        <p>END PLAY AREA</p>
      </div>
    );
  }
}

export default PlayArea;

import React, { Component } from 'react';
import './index.css';

class Messages extends Component {
  render() {
    return (
      <div className="messages">
        <p>
          Clear the mines... but carefully!  Expose squares one at a time by clicking on them.
          If a square does not have a mine on it, you'll see how many of its neighbors do.
        </p>
        <p>
          Right-click to flag a square as a mine and protect it from your clicks.
        </p>
        <p>
          You win by exposing all squares without mines. You lose if you hit a mine.
        </p>
      </div>
    );
  }
}

export default Messages;

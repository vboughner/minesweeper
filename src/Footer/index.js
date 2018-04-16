import React, { Component } from 'react';
import './index.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>
          Written with React by <a href="https://www.linkedin.com/in/vboughner">Van Boughner</a> (
          <a href="https://github.com/vboughner/minesweeper">source on github</a>)
        </p>
      </div>
    );
  }
}

export default Footer;

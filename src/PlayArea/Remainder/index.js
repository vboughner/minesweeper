import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Remainder extends Component {
  render() {
    return (
      <div className="remainder">
        <p>{this.props.numMines - this.props.numFlags}</p>
        <p className="small">mines</p>
      </div>
    );
  }
}

Remainder.propTypes = {
  numMines: PropTypes.number.isRequired,
  numFlags: PropTypes.number.isRequired,
};

export default Remainder;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Status extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let status = '';
    if (!this.props.startTime) {
      status = <p className="small">ready to start</p>;
    }
    else if (!this.props.endTime) {
      status = <p className="small">playing...</p>;
    }
    else {
      if (this.props.coveredSafeSquares === 0) {
        status = <p>You Won!</p>;
      }
      else {
        status = <p>You Lost!</p>;
      }
    }

    return (
      <div className="status">
        {status}
      </div>
    );
  }
}

Status.propTypes = {
  coveredSafeSquares: PropTypes.number,
  startTime: PropTypes.number,
  endTime: PropTypes.number
};

export default Status;

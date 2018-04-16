import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedMilliseconds: 0
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    if (this.props.startTime) {
      if (this.props.endTime) {
        this.setState({elapsedMilliseconds: this.props.endTime - this.props.startTime});
      }
      else {
        this.setState({elapsedMilliseconds: Date.now() - this.props.startTime});
      }
    }
    else {
      this.setState({elapsedMilliseconds: 0});
    }
  }

  render() {
    let seconds = Math.round(this.state.elapsedMilliseconds / 1000);
    return (
      <div className="timer">
        <p>{seconds}</p>
        <p className="small">seconds</p>
      </div>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number
};

export default Timer;

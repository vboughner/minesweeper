import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDifficulty: this.props.difficulty
    };
    this.setDifficulty = this.setDifficulty.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  setDifficulty(event) {
    this.setState({newDifficulty: event.target.value});
  }

  restartGame() {
    this.props.onRestartGame(this.state.newDifficulty);
  }

  render() {
    return (
      <div className="setup">
        <p className="small">Difficulty </p>
        <div className="radio" onChange={this.setDifficulty}>
          <input type="radio" value="1" name="difficulty" defaultChecked={this.state.newDifficulty === 1} /> Easy <br />
          <input type="radio" value="2" name="difficulty" defaultChecked={this.state.newDifficulty === 2} /> Medium <br />
          <input type="radio" value="3" name="difficulty" defaultChecked={this.state.newDifficulty === 3} /> Hard
        </div>
        <button className="restart" onClick={this.restartGame}>Restart</button>
      </div>
    );
  }
}

Setup.propTypes = {
  difficulty: PropTypes.number.isRequired,
  onRestartGame: PropTypes.func.isRequired
};

export default Setup;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// TODO: implement all of these tests

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('starts at medium difficulty', () => {

});

it('starts with 10 mines and no flags', () => {

});

it('starts with all squares covered', () => {

});

it('starts with timer at 0', () => {

});

it('starts with status display saying ready to start', () => {

});

it('restart button will clear and reset the squares', () => {

});

it('easy difficulty uses board size of 5x5 and 2 mines', () => {

});

it('medium difficulty uses board size of 9x9 and 10 mines', () => {

});

it('hard difficulty uses board size of 13x13 and 35 mines', () => {

});

it('clicking on a mine loses the game', () => {

});

it('revealing the last blank square wins the game', () => {

});

it('flagging a square marks it with icon', () => {

});

it('unflagging a square removes the icon', () => {

});

it('flagging a square means you cannot click on it to reveal accidentally', () => {

});

it('flagged blank square is not revealed when nearby blank square is clicked', () => {

});

it('flagging a square makes the mine remainder display decrement', () => {

});

it('unflagging a square makes the mine remainder display increment', () => {

});

it('reveals a number at a square near a mine', () => {

});

it('shows numbers that are different colors', () => {

});

it('reveals other blank squares and non-mine squares near a blank square', () => {

});

it('time stops at end of game', () => {

});

it('status reports that you have won a game', () => {

});

it('status reports that you have lost a game', () => {

});

it('status reports when are in the middle of a game', () => {

});

it('lost games shows which mine made you lose in a different color', () => {

});

it('blank squares have a different background color than covered squares', () => {

});

it('all squares are uncovered when game is won', () => {

});

it('all squares are uncovered when game is lost', () => {

});

it('all flags disappear when game ends', () => {

});

it('all mines are visible when game ends', () => {

});

it('when you win the game there should be no exploded square', () => {

});

it('when you lose the game, one of the mines should be in an exploded square', () => {

});

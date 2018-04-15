import React, { Component } from 'react';
import Title from './Title';
import PlayArea from './PlayArea';
import Messages from './Messages';
import Footer from './Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Title />
        <PlayArea />
        <Messages />
        <Footer />
      </div>
    );
  }
}

export default App;

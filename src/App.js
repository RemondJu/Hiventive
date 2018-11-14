import React, { Component } from 'react';
import './App.css';
import BeePolarLogo from './images/BeePolarLogo.png'


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>¡Holà mundo! <img src={BeePolarLogo} alt="BeePolarLogo"/></h1>
      </div>
    );
  }
}

export default App;

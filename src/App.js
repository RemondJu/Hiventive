import React from 'react';
import './App.css';
import BeePolarLogo from './images/BeePolarLogo.png';
import NavBar from './containers/NavBar';

const App = () => (
  <div className="App">
    <NavBar />
    <h1>
        Projet Hiventive - Bee.Polar team
      <img src={BeePolarLogo} alt="BeePolarLogo" />
    </h1>
  </div>
);

export default App;

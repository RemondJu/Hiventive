import React from 'react';
import './NavBar.scss';
import logoHiventivePNG from '../images/logoHiventivePNG.png';

const NavBar = () => (
  <div className="NavBar">
    <a href="NavBar" className="logo">
      <img className="logo" alt="logo_hiventive" src={logoHiventivePNG} />
      <h1 className="title">Hiventive</h1>
    </a>

    <div className="searchbar">
      <input className="field" placeholder="Search for layers" type="text" />
      <button className="button_search" type="submit">Search</button>
    </div>
    <button className="button_login" type="submit">Login / Sign in</button>
  </div>
);

export default NavBar;

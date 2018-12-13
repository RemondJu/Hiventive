import React from 'react';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './NavBar.scss';
import '../components/ModalLogin.scss';
import switchLoginModal from '../actions';
import ModalLogin from '../components/ModalLogin';
import logoHiventiveWhite from '../images/logoHiventive_white.png';

const NavBar = props => (
  <div className="NavBar">
    <NavLink to="/" className="logo">
      <img className="logo" alt="logo_hiventive" src={logoHiventiveWhite} />
      <h1 className="title">Hiventive</h1>
    </NavLink>
    <div className="searchbar">
      <input className="field" placeholder="Search for layers" type="text" />
      <button className="button_search" type="submit">Search</button>
    </div>
    <button className="button_login" type="submit" onClick={() => props.switchLoginModal()}>Login / Sign in</button>
    <ModalLogin />
  </div>
);


function mdtp(dispatch) { return bindActionCreators({ switchLoginModal }, dispatch); }

export default connect(null, mdtp)(NavBar);

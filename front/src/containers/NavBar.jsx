import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import './NavBar.scss';
import '../components/ModalLogin.scss';
import { showToggleAdd, showToggleLog, switchLoginModal } from '../actions';
import ModalLogin from '../components/ModalLogin';
import logoHiventiveWhite from '../images/logoHiventive_white.png';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      switchLoginModalRedux,
      showToggleAddRedux,
      showToggleLogRedux,
      popoversNavbar,
    } = this.props;
    return (
      <div className="NavBar">
        <NavLink to="/" className="logo">
          <img className="logo" alt="logo_hiventive" src={logoHiventiveWhite} />
          <h1 className="title">Hiventive</h1>
        </NavLink>
        <div className="searchbar">
          <input className="field" placeholder="Search for layers" type="text" />
          <button className="button_search" type="submit">Search</button>
        </div>
        <div className="buttonsForPopovers">
          <button className="button_login" onClick={() => showToggleAddRedux()} type="button">+</button>
          <div className={popoversNavbar.toggleAdd ? 'popoversShow effectAdd' : 'popoversHid'}>
            <div className={popoversNavbar.toggleAdd ? 'textShow' : 'textHidden'}>
              <NavLink className="button_link_log" to="/newLayer/">Add new Layer</NavLink>
            </div>
          </div>
          <button className="button_login" onClick={() => showToggleLogRedux()} type="button">Login / Sign in</button>
          <div className={popoversNavbar.toggleLog ? 'popoversShow effectLog' : 'popoversHid'}>
            <div className={popoversNavbar.toggleLog ? 'textShow' : 'textHidden'}>
              <button className="button_link_log" type="button" onClick={() => switchLoginModalRedux()}>login</button>
            </div>
          </div>
        </div>
        <ModalLogin />
      </div>
    );
  }
}

NavBar.propTypes = {
  switchLoginModalRedux: PropTypes.func.isRequired,
  showToggleAddRedux: PropTypes.func.isRequired,
  showToggleLogRedux: PropTypes.func.isRequired,
  popoversNavbar: PropTypes.shape.isRequired,
};

const mstp = state => ({
  popoversNavbar: state.popoversNavbar,
});

const mdtp = dispatch => bindActionCreators({
  switchLoginModalRedux: switchLoginModal,
  showToggleAddRedux: showToggleAdd,
  showToggleLogRedux: showToggleLog,
}, dispatch);

export default connect(mstp, mdtp)(NavBar);

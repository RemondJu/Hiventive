import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import './NavBar.scss';
import '../components/ModalLogin.scss';
import switchLoginModal from '../actions';
import ModalLogin from '../components/ModalLogin';
import logoHiventiveWhite from '../images/logoHiventive_white.png';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAdd: false,
      toggleLog: false,
    };
    this.showToggleAdd = this.showToggleAdd.bind(this);
    this.showToggleLog = this.showToggleLog.bind(this);
  }

  showToggleAdd() {
    this.setState(prevState => ({
      toggleAdd: !prevState.toggleAdd,
      toggleLog: false,
    }));
  }

  showToggleLog() {
    this.setState(prevState => ({
      toggleLog: !prevState.toggleLog,
      toggleAdd: false,
    }));
  }


  render() {
    const { switchLoginModalRedux } = this.props;
    const { toggleLog, toggleAdd } = this.state;
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
          <button className="button_login" onClick={() => this.showToggleAdd()} type="button">+</button>
          <div className={toggleAdd ? 'popoversShow effectAdd' : 'popoversHid'}>
            <div className={toggleAdd ? 'textShow' : 'textHidden'}>
              <p>Add new Layer</p>
            </div>
          </div>
          <button className="button_login" onClick={() => this.showToggleLog()} type="button">Login / Sign in</button>
          <div className={toggleLog ? 'popoversShow effectLog' : 'popoversHid'}>
            <div className={toggleLog ? 'textShow' : 'textHidden'}>
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
};

const mdtp = dispatch => bindActionCreators({
  switchLoginModalRedux: switchLoginModal,
}, dispatch);

export default connect(null, mdtp)(NavBar);

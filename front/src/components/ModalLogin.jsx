import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import switchLoginModal from '../actions';

import './ModalLogin.scss';

const ModalLogin = (props) => {
  const { modal } = props;
  return (
    <div className={`modal_login ${modal}`}>
      <div className="modal_login_content">
        <button type="submit" className="close" onClick={() => props.switchLoginModal()}>&times;</button>
        <h2 className="login_title">CONNEXION</h2>
        <p className="login_intro">Use your Hiventive account</p>
        <form className="login_form">
          Email adress
          <input type="text" className="login_input" />
          <br />
          Password
          <input type="text" className="login_input" />
        </form>
        <p className="login_intro">Use your Git account</p>
        <div className="login_sign_in">
          <button type="submit" className="login_hiventive">Create an Hiventive account</button>
          <button type="submit" className="login_submit" onClick={() => props.switchLoginModal()}>Login</button>
        </div>
      </div>
    </div>
  );
};

const mstp = state => ({
  modal: state.modal,
});

function mdtp(dispatch) { return bindActionCreators({ switchLoginModal }, dispatch); }

export default connect(mstp, mdtp)(ModalLogin);

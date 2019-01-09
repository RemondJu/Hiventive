import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchLoginModal } from '../actions';

import './ModalLogin.scss';

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { loginModal } = this.props;
    event.preventDefault();
    loginModal();
  }

  render() {
    const { name, password } = this.state;
    const { modal, loginModal } = this.props;
    return (
      <div className={`ModalLogin ${modal}`}>
        <div className="innerWindow">
          <button type="button" className="close" onClick={() => loginModal()}>&times;</button>
          <h2 className="login_title">CONNEXION</h2>
          <p className="login_text">Use your Hiventive account</p>
          <form onSubmit={this.handleSubmit}>
            Email adress
            <input name="name" type="text" onChange={this.handleChange} className="login_input" value={name} />
            <br />
            Password
            <input name="password" type="text" onChange={this.handleChange} className="login_input" value={password} />
            <div className="login_sign_in">
              <button type="button" className="signin_hiventive">Create an Hiventive account</button>
              <button type="submit" className="login_submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mstp = state => ({
  modal: state.modal,
});

function mdtp(dispatch) { return bindActionCreators({ loginModal: switchLoginModal }, dispatch); }

export default connect(mstp, mdtp)(ModalLogin);

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { switchLoginModal } from '../actions';
import { fetchLogUser } from '../actions/fetch';


import './ModalLogin.scss';

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
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
    const { firstname, password } = this.state;
    const { loginModal, fetchLogUserRedux, history } = this.props;
    event.preventDefault();
    loginModal();
    fetchLogUserRedux({ firstname, password });
    history.push('/');
    this.setState({
      password: '',
    });
  }

  render() {
    const { firstname, password } = this.state;
    const { modal, loginModal } = this.props;
    return (
      <div className={`ModalLogin ${modal}`}>
        <div className="innerWindow">
          <button type="button" className="close" onClick={() => loginModal()}>&times;</button>
          <h2 className="login_title">CONNEXION</h2>
          <p className="login_text">Use your Hiventive account</p>
          <form onSubmit={this.handleSubmit}>
            First name
            <input required name="firstname" type="text" onChange={this.handleChange} className="login_input" value={firstname} />
            <br />
            Password
            <input required name="password" type="password" onChange={this.handleChange} className="login_input" value={password} />
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

const mdtp = dispatch => bindActionCreators({
  loginModal: switchLoginModal,
  fetchLogUserRedux: fetchLogUser,
}, dispatch);

export default withRouter(connect(mstp, mdtp)(ModalLogin));

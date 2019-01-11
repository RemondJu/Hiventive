import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './NewProjectModal.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newProjectModal } from '../actions';
import API_SERVER from '../constants';

class NewProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      projectDescription: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { userIsLogin, history, newProjectModalAction } = this.props;
    const { projectName, projectDescription } = this.state;
    const dataSend = {
      name: projectName,
      userId: userIsLogin.id,
      description: projectDescription,
    };
    const conf = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    };
    fetch(`${API_SERVER}/projects`, conf)
      .then(() => history.push('/pageProject'))
      .then(() => newProjectModalAction())
      .catch();
  }

  render() {
    const { projectName, projectDescription } = this.state;
    const { newProjectModalAction, newProjectModalToggle } = this.props;
    return (
      <div className={`NewProjectModal ${newProjectModalToggle}`}>
        <div className="innerWindow">
          <button type="button" className="close" onClick={newProjectModalAction}>&times;</button>
          <h2 className="login_title">Create a new OS project</h2>
          <form onSubmit={this.handleSubmit}>
            Project name
            <input name="projectName" type="text" onChange={this.handleChange} className="login_input" value={projectName} />
            <br />
            Description
            <input name="projectDescription" type="text" onChange={this.handleChange} className="login_input" value={projectDescription} />
            <div className="createImport">
              <button type="button" className="importButton">Import Hiventive hardware</button>
              <button type="submit" className="createButton">Create project</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewProjectModal.propTypes = {
  newProjectModalToggle: PropTypes.shape.isRequired,
  userIsLogin: PropTypes.shape.isRequired,
  newProjectModalAction: PropTypes.func.isRequired,
};


const mstp = state => ({
  newProjectModalToggle: state.newProjectModalToggle,
  userIsLogin: state.userIsLogin,
});

const mdtp = dispatch => bindActionCreators({ newProjectModalAction: newProjectModal }, dispatch);

export default withRouter(connect(mstp, mdtp)(NewProjectModal));

import React, { Component } from 'react';
import './NewProjectModal.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newProjectModal } from '../actions';

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
    this.setState({
      projectName: '',
      projectDescription: '',
    });
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

const mstp = state => ({
  newProjectModalToggle: state.newProjectModalToggle,
});

const mdtp = dispatch => bindActionCreators({ newProjectModalAction: newProjectModal }, dispatch);

export default connect(mstp, mdtp)(NewProjectModal);

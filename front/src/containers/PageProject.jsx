import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './PageProject.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProjectUser, fetchLayersFromActiveProject } from '../actions/fetch';
import { selectActiveProject } from '../actions';
import BackButton from '../components/toolPage/BackButton';
import SideBarDefault from '../components/toolPage/SideBarDefault';
import LayerFromCatalog from './LayerFromCatalog';
import API_SERVER from '../constants';

class PageProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteButtonEnabled: false,
      editionButtonEnabled: false,
      newProjectName: '',
      newProjectDescription: '',
    };
    this.selectProject = this.selectProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.activateDeletion = this.activateDeletion.bind(this);
    this.deactivateDeletion = this.deactivateDeletion.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.sendProjectUpdate = this.sendProjectUpdate.bind(this);
  }

  componentDidMount() {
    const { fetchProjectUserRedux, userIsLogin } = this.props;
    fetchProjectUserRedux(userIsLogin.id);
    this.setState({
      deleteButtonEnabled: false,
      editionButtonEnabled: false,
      clickHappened: false,
    });
  }

  componentDidUpdate() {
    const { fetchProjectUserRedux, userIsLogin } = this.props;
    const { editionButtonEnabled, deleteButtonEnabled, clickHappened } = this.state;
    if ((!editionButtonEnabled && clickHappened) || (!deleteButtonEnabled && clickHappened)) {
      fetchProjectUserRedux(userIsLogin.id);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  editionMode(name, description) {
    this.setState({
      editionButtonEnabled: true,
      newProjectName: name,
      newProjectDescription: description,
      clickHappened: true,
    });
  }

  closeEdition() {
    this.setState({
      editionButtonEnabled: false,
    });
  }

  activateDeletion() {
    this.setState({
      clickHappened: true,
      deleteButtonEnabled: true,
    });
  }

  deactivateDeletion() {
    this.setState({
      deleteButtonEnabled: false,
    });
  }

  deleteProject(id) {
    const conf = {
      method: 'DELETE',
    };
    fetch(`${API_SERVER}/project/${id}`, conf)
      .then(this.setState({
        clickHappened: false,
        deleteButtonEnabled: false,
      }));
  }

  sendProjectUpdate(e) {
    e.preventDefault();
    const {
      activeProjectId,
    } = this.props;
    const {
      newProjectDescription,
      newProjectName,
    } = this.state;
    const data = {
      name: newProjectName,
      description: newProjectDescription,
    };
    const conf = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(`${API_SERVER}/project/${activeProjectId}`, conf)
      .then(this.setState({
        clickHappened: true,
        editionButtonEnabled: false,
      }));
  }

  selectProject(id) {
    const { selectActiveProjectAction, fetchLayersFromActiveProjectAction } = this.props;
    selectActiveProjectAction(id);
    fetchLayersFromActiveProjectAction(id);
  }

  render() {
    const { projectUser, projectLayers, activeProjectId } = this.props;
    const {
      deleteButtonEnabled,
      editionButtonEnabled,
      newProjectName,
      newProjectDescription,
    } = this.state;
    const pos = activeProjectId !== 0 ? projectUser.map(el => el.id).indexOf(activeProjectId) : 0;
    const projectName = activeProjectId !== 0 ? projectUser[pos].name : '';
    const projectDesc = activeProjectId !== 0 ? projectUser[pos].description : '';
    const textButtonDelete = deleteButtonEnabled ? 'Double click to confirm' : 'Delete this project';
    const deletionConfirm = deleteButtonEnabled
      ? () => this.deleteProject(activeProjectId) : () => { };
    const textButtonEdit = editionButtonEnabled ? 'Double click to exit edition' : 'Edit your project';
    const exitEdition = editionButtonEnabled ? () => this.closeEdition() : () => { };
    return (
      <div className="PageProject">
        <div className="sideBarProject">
          <div className="projectRow">
            <SideBarDefault>
              <ul>
                {projectUser.map(userProject => <li key={userProject.id}><button type="button" onClick={() => this.selectProject(userProject.id)}>{userProject.name}</button></li>)}
              </ul>
            </SideBarDefault>
          </div>
        </div>
        <div className="titleProject">
          <div className="titleDisplay">
            <form className="titleDesc" onSubmit={this.sendProjectUpdate}>
              {editionButtonEnabled ? (
                <label className="label_input" htmlFor="newProjectName">
                Name :
                  <input className="login_input_title" required name="newProjectName" id="newProjectName" onChange={this.handleChange} value={newProjectName} type="text" />
                </label>
              ) : <h1>{activeProjectId !== 0 ? projectName : 'Select one of your projects'}</h1>}
              {editionButtonEnabled ? (
                <label className="label_input" htmlFor="newProjectDescription">
                Description :
                  <input className="login_input_title" required name="newProjectDescription" id="newProjectDescription" onChange={this.handleChange} value={newProjectDescription} type="text" />
                </label>
              ) : <p>{activeProjectId !== 0 ? projectDesc : ''}</p>}
              {editionButtonEnabled ? (
                <button className="button_display_submit" type="submit">Submit</button>
              ) : ''}
            </form>
            <div className="projectBackButton">
              <BackButton />
            </div>
          </div>
          {activeProjectId !== 0
            ? (
              <div className="editRemoveButtons">
                <button
                  className="button_display"
                  type="button"
                  onClick={() => this.editionMode(projectName, projectDesc)}
                  onDoubleClick={exitEdition}
                >
                  <span>{textButtonEdit}</span>
                </button>
                <button
                  className="button_display"
                  type="button"
                  onMouseOut={deleteButtonEnabled ? this.deactivateDeletion : () => { }}
                  onClick={() => this.activateDeletion()}
                  onDoubleClick={deletionConfirm}
                >
                  <span>{textButtonDelete}</span>
                </button>
              </div>) : ''}
          <table className="layersTitles">
            {projectLayers[0] ? projectLayers.map(projectLayer => (
              <LayerFromCatalog
                key={projectLayer.id}
                id={projectLayer.id}
                name={projectLayer.name}
                description={projectLayer.description}
                url={projectLayer.url}
                repository={projectLayer.repository}
                share={projectLayer.share}
              />)) : <p>No layers yet...</p>
            }
          </table>
        </div>
      </div>
    );
  }
}

PageProject.propTypes = {
  fetchProjectUserRedux: PropTypes.func.isRequired,
  selectActiveProjectAction: PropTypes.func.isRequired,
  fetchLayersFromActiveProjectAction: PropTypes.func.isRequired,
  projectLayers: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mstp = state => ({
  userIsLogin: state.userIsLogin,
  projectUser: state.projectUser,
  activeProjectId: state.activeProjectId,
  projectLayers: state.projectLayers,
});

const mdtp = dispatch => bindActionCreators({
  fetchProjectUserRedux: fetchProjectUser,
  selectActiveProjectAction: selectActiveProject,
  fetchLayersFromActiveProjectAction: fetchLayersFromActiveProject,
}, dispatch);

export default withRouter(connect(mstp, mdtp)(PageProject));

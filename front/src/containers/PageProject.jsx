import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import './PageProject.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchProjectUser,
  fetchLayersFromActiveProject,
} from '../actions/fetch';
import {
  selectActiveProject,
  enableRefresh,
  resetActiveProject,
  getActiveProjectName,
} from '../actions';
import SideBarDefault from '../components/SideBarDefault';

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
    const { fetchProjectUserRedux, userIsLogin, getActiveProjectLayers } = this.props;
    fetchProjectUserRedux(userIsLogin.id);
    getActiveProjectLayers(userIsLogin.id);
    this.setState({
      deleteButtonEnabled: false,
      editionButtonEnabled: false,
    });
  }

  componentDidUpdate() {
    const {
      fetchProjectUserRedux,
      userIsLogin,
      refreshFetch,
      getActiveProjectLayers,
    } = this.props;
    if (refreshFetch) {
      getActiveProjectLayers(userIsLogin.id);
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
    });
  }

  closeEdition() {
    this.setState({
      editionButtonEnabled: false,
    });
  }

  activateDeletion() {
    this.setState({
      deleteButtonEnabled: true,
    });
  }

  deactivateDeletion() {
    this.setState({
      deleteButtonEnabled: false,
    });
  }

  deleteProject(id) {
    const { enableRefreshAction, resetActiveProjectAction } = this.props;
    const conf = {
      method: 'DELETE',
    };
    fetch(`${API_SERVER}/delete-project/${id}`, conf)
      .then(resetActiveProjectAction())
      .then(enableRefreshAction())
      .then(this.setState({
        deleteButtonEnabled: false,
      }));
  }

  sendProjectUpdate(e) {
    e.preventDefault();
    const {
      activeProjectId, enableRefreshAction,
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
        editionButtonEnabled: false,
      }))
      .then(enableRefreshAction);
  }

  selectProject(id, name) {
    const {
      selectActiveProjectAction,
      getActiveProjectLayers,
      getActiveProjectNameAction,
    } = this.props;
    selectActiveProjectAction(id);
    getActiveProjectLayers(id);
    getActiveProjectNameAction(name);
  }

  render() {
    const {
      projectUser,
      projectLayers,
      activeProjectId,
      activeProjectName,
    } = this.props;
    const {
      deleteButtonEnabled,
      editionButtonEnabled,
      newProjectName,
      newProjectDescription,
    } = this.state;
    const title = activeProjectId !== 0 ? activeProjectName : 'Select a project';
    const pos = activeProjectId !== 0 ? projectUser.map(el => el.id).indexOf(activeProjectId) : 0;
    return (
      <div className="PageProject">
        <SideBarDefault>
          <div className="filters">
            <h2>OS Projects</h2>
            <ul className="projects-list">
              {projectUser.map(userProject => <li key={userProject.id}><button type="button" className="filter" onClick={() => this.selectProject(userProject.id, userProject.name)}>{userProject.name}</button></li>)}
            </ul>
            <NavLink to="/project-build-page">
              <button className="button-build" type="button">
                Build your OS
              </button>
            </NavLink>
          </div>
        </SideBarDefault>
        <div className="titleProject">
          <div className="titleDisplay">
            <div className="flexAdjust">
              {''}
            </div>
            <form className="titleDesc" onSubmit={this.sendProjectUpdate}>
              {editionButtonEnabled ? (
                <label className="label_input" htmlFor="newProjectName">
                  Name :
                  <input className="editionInput" required name="newProjectName" id="newProjectName" onChange={this.handleChange} value={newProjectName} type="text" />
                </label>
              ) : <h2>{activeProjectName}</h2>}
              {editionButtonEnabled ? (
                <label className="label_input" htmlFor="newProjectDescription">
                  Description :
                  <input className="editionInput" required name="newProjectDescription" id="newProjectDescription" onChange={this.handleChange} value={newProjectDescription} type="text" />
                </label>
              ) : <p className="description_style">{activeProjectId !== 0 ? projectUser[pos].description : ''}</p>}
              {editionButtonEnabled ? (
                <button className="button_display_submit" type="submit">Submit</button>
              ) : ''}
            </form>
          </div>
          {activeProjectId !== 0
            ? (
              <div className="editRemoveButtons">
                <button
                  className="button_display"
                  type="button"
                  onClick={
                    () => this.editionMode(projectUser[pos].name, projectUser[pos].description)}
                  onDoubleClick={editionButtonEnabled
                    ? () => this.closeEdition() : () => { }}
                >
                  <span>{editionButtonEnabled ? 'Double click to exit' : 'Edit your project'}</span>
                </button>
                <button
                  className="button_display"
                  type="button"
                  onDoubleClick={deleteButtonEnabled ? this.deactivateDeletion : () => { }}
                  onClick={this.activateDeletion}
                >
                  <span>{deleteButtonEnabled ? 'Double click to exit' : 'Delete this project'}</span>
                </button>
                {deleteButtonEnabled ? <button type="button" onClick={() => this.deleteProject(activeProjectId)}>Confirm</button> : ''}
              </div>) : ''}
          <table className="layersTitles">
            <div className="scrolling">
              {projectLayers[0] ? projectLayers.map(projectLayer => (
                <LayerFromCatalog
                  key={projectLayer.id}
                  id={projectLayer.id}
                  name={projectLayer.name}
                  description={projectLayer.description}
                  url={projectLayer.url}
                  repository={projectLayer.hostSite}
                  share={projectLayer.share}
                />)) : (
                  <p className="EmptyMessage">
                No layers yet...
                    <span aria-label="cryEmoji" role="img"> 😭 </span>
                  </p>
              ) }
            </div>
          </table>
        </div>
      </div>
    );
  }
}

PageProject.propTypes = {
  // Functions
  fetchProjectUserRedux: PropTypes.func.isRequired,
  selectActiveProjectAction: PropTypes.func.isRequired,
  getActiveProjectLayers: PropTypes.func.isRequired,
  enableRefreshAction: PropTypes.func.isRequired,
  resetActiveProjectAction: PropTypes.func.isRequired,
  getActiveProjectNameAction: PropTypes.func.isRequired,
  // Arrays
  projectLayers: PropTypes.arrayOf(PropTypes.shape).isRequired,
  projectUser: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // Others
  userIsLogin: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  activeProjectId: PropTypes.number,
  activeProjectName: PropTypes.string,
  refreshFetch: PropTypes.bool.isRequired,
};

PageProject.defaultProps = {
  activeProjectId: 0,
  activeProjectName: '',
};

const mstp = state => ({
  userIsLogin: state.userIsLogin,
  projectUser: state.projectUser,
  activeProjectId: state.activeProjectId,
  projectLayers: state.projectLayers,
  refreshFetch: state.refreshFetch,
  activeProjectName: state.activeProjectName,
});

const mdtp = dispatch => bindActionCreators({
  fetchProjectUserRedux: fetchProjectUser,
  selectActiveProjectAction: selectActiveProject,
  getActiveProjectLayers: fetchLayersFromActiveProject,
  enableRefreshAction: enableRefresh,
  resetActiveProjectAction: resetActiveProject,
  getActiveProjectNameAction: getActiveProjectName,
}, dispatch);

export default withRouter(connect(mstp, mdtp)(PageProject));

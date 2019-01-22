import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchLayersFromActiveProject } from '../actions/fetch';
import { selectActiveProject, getActiveProjectName } from '../actions';
import './PageBuildProject.scss';

import LayerFromCatalog from './LayerFromCatalog';
import SideBarDefault from '../components/SideBarDefault';


class PageBuildProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectProject = this.selectProject.bind(this);
  }

  selectProject(id, name) {
    const {
      selectActiveProjectAction,
      fetchLayersFromActiveProjectAction,
      getActiveProjectNameAction,
    } = this.props;
    selectActiveProjectAction(id);
    fetchLayersFromActiveProjectAction(id);
    getActiveProjectNameAction(name);
  }

  render() {
    const { projectUser, projectLayers, activeProjectName } = this.props;
    return (
      <div className="page_build-project">
        <SideBarDefault>
          <h2>
            <span style={{ fontWeight: 'bold' }}>OS </span>
            Projects
          </h2>
          <ul className="projects-list">
            {projectUser.map(userProject => <li key={userProject.id}><button type="button" className="filter" onClick={() => this.selectProject(userProject.id, userProject.name)}>{userProject.name}</button></li>)}
          </ul>
        </SideBarDefault>
        <div className="titleProject">
          <h1>{activeProjectName}</h1>
          <div className="all-buttons-build">
            <button className="button-build" type="button">
              OS code
            </button>
            <button className="button-build" type="button">
              OS image
            </button>
          </div>
          <div className="titleDisplay">
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
                />)) : (
                  <p>
                    No layers yet...
                    <span aria-label="cryEmoji" role="img"> 😭 </span>
                  </p>
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mstp = state => ({
  projectUser: state.projectUser,
  projectLayers: state.projectLayers,
  activeProjectName: state.activeProjectName,
});

const mdtp = dispatch => bindActionCreators({
  selectActiveProjectAction: selectActiveProject,
  fetchLayersFromActiveProjectAction: fetchLayersFromActiveProject,
  getActiveProjectNameAction: getActiveProjectName,
}, dispatch);

export default connect(mstp, mdtp)(PageBuildProject);

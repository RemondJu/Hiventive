import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageProject.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { fetchProjectUser, fetchLayersFromActiveProject } from '../actions/fetch';
import { selectActiveProject } from '../actions';
import BackButton from '../components/toolPage/BackButton';
import SideBarDefault from '../components/toolPage/SideBarDefault';

import LayerFromCatalog from './LayerFromCatalog';

class PageProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectProject = this.selectProject.bind(this);
  }

  componentDidMount() {
    const { fetchProjectUserRedux, userIsLogin } = this.props;
    fetchProjectUserRedux(userIsLogin.id);
  }

  selectProject(id) {
    const { selectActiveProjectAction, fetchLayersFromActiveProjectAction } = this.props;
    selectActiveProjectAction(id);
    fetchLayersFromActiveProjectAction(id);
  }

  render() {
    const { projectUser, projectLayers, activeProjectId } = this.props;
    const pos = activeProjectId !== 0 ? projectUser.map(el => el.id).indexOf(activeProjectId) : 0;
    return (
      <div className="PageProject">
        <div className="sideBarProject">
          <div className="projectRow">
            <SideBarDefault>
              <h2>OS Projects</h2>
              <ul className="projects-list">
                {projectUser.map(userProject => <li key={userProject.id}><button type="button" className="filter" onClick={() => this.selectProject(userProject.id)}>{userProject.name}</button></li>)}
              </ul>
              <NavLink to="/project-build-page">
                <button className="button-build" type="button">
                  Build your OS
                </button>
              </NavLink>
            </SideBarDefault>
          </div>
        </div>
        <div className="titleProject">
          <div className="titleDisplay">
            <h1>{activeProjectId !== 0 ? `Project ${projectUser[pos].name}` : 'Select one of your projects'}</h1>
            <div className="projectBackButton">
              <BackButton />
            </div>
          </div>
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

export default connect(mstp, mdtp)(PageProject);

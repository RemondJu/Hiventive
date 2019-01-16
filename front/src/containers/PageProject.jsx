import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageProject.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    const { projectUser, activeProjectId, projectLayers } = this.props;
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
          <h1>{activeProjectId !== 0 ? `Welcome to project ${activeProjectId}` : 'Select one of your projects'}</h1>
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
        <div className="projectBackButton">
          <BackButton />
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

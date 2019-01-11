import React, { Component } from 'react';
import './PageProject.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProjectUser, fetchLayersFromActiveProject } from '../actions/fetch';
import { selectActiveProject } from '../actions';
import BackButton from '../components/toolPage/BackButton';
import SideBarDefault from '../components/toolPage/SideBarDefault';


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
          <h1>{`Welcome to project ${activeProjectId}`}</h1>
          {console.log(projectLayers)}
        </div>
        <div className="projectBackButton">
          <BackButton />
        </div>
      </div>

    );
  }
}

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

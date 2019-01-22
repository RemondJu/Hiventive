import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PageBuildProject.scss';
import SideBarDefault from '../components/SideBarDefault';

class PageBuildProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { projectUser } = this.props;
    return (
      <div className="page_build-project">
        <SideBarDefault>
          <h2>
            <span style={{ fontWeight: 'bold' }}>OS </span>
            Projects
          </h2>
          <ul className="projects-list">
            {projectUser.map(userProject => <li key={userProject.id}><button type="button" className="filter" onClick={() => this.selectProject(userProject.id)}>{userProject.name}</button></li>)}
          </ul>
        </SideBarDefault>
        <div className="titleProject">
          <h1>test title</h1>
          <div className="titleDisplay">
            <button className="button-build" type="button">
              OS code
            </button>
            <button className="button-build" type="button">
              OS image
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mstp = state => ({
  projectUser: state.projectUser,
});

export default connect(mstp)(PageBuildProject);

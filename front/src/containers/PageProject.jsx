import React, { Component } from 'react';
import './PageProject.scss';
import { NavLink } from 'react-router-dom';

import ProjectSideBar from './ProjectSideBar';
import BackButton from '../components/toolPage/BackButton';


class PageProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   const { match, fetchData } = this.props;
  //   fetchData(match.params.id);
  // }

  render() {
    // const { project } = this.props;
    return (
      <div className="PageProject">
        <div className="sideBarProject">
          <NavLink to="/ToolPage">
            <div className="projectRow">
              <ProjectSideBar />
            </div>
          </NavLink>
        </div>
        <div className="titleProject">
          <h1>Welcome to </h1>
        </div>
        <div className="projectBackButton">
          <BackButton />
        </div>
      </div>

    );
  }
}

export default PageProject;

import React from 'react';
import './SideBar.scss';

import { NavLink } from 'react-router-dom';


const projectSideBar = () => (
  <div className="ProjectSideBar">
    <div className="filters">
      <h2>My Projects</h2>
      <button type="submit" className="filter">Project_01</button>
      <button type="submit" className="filter">Project_02</button>
      <button type="submit" className="filter">Project_03</button>
      <button type="submit" className="filter">Project_04</button>
    </div>
    <NavLink to="/ProjectPage">
      <button className="buildButton" type="submit">
        Build your project
      </button>
    </NavLink>
  </div>
);

export default projectSideBar;

import React from 'react';
import './SideBar.scss';

import { NavLink } from 'react-router-dom';
import NewProjectButton from './NewProjectButton';


const projectSideBar = () => (
  <div className="SideBar">
    <div className="filters">
      <h2>My Projects</h2>
      <button type="submit" className="filter">Project_01</button>
      <button type="submit" className="filter">Project_02</button>
      <button type="submit" className="filter">Project_03</button>
      <button type="submit" className="filter">Project_04</button>
    </div>
    <NavLink to="/ProjectPage">
      <NewProjectButton />
    </NavLink>
  </div>
);

export default projectSideBar;

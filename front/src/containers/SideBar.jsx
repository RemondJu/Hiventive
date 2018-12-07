import React from 'react';
import './SideBar.scss';

const SideBar = () => (
  <div className="SideBar">
    <div className="filters">
      <h2>Sort layers by</h2>
      <button type="submit" className="filter">Recipes</button>
      <button type="submit" className="filter">Machines</button>
      <button type="submit" className="filter">Classes</button>
      <button type="submit" className="filter">Distros</button>
    </div>
    <button type="submit">
      <span>+ </span>
      New project
    </button>
  </div>
);

export default SideBar;

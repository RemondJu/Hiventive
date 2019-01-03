import React from 'react';
import './SideBar.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newProjectModal } from '../actions';

const SideBar = (props) => {
  const { newProjectModalAction } = props;
  return (
    <div className="SideBar">
      <div className="filters">
        <h2>Sort layers by</h2>
        <button type="submit" className="filter">Recipes</button>
        <button type="submit" className="filter">Machines</button>
        <button type="submit" className="filter">Classes</button>
        <button type="submit" className="filter">Distros</button>
      </div>
      <button type="submit" onClick={newProjectModalAction}>
        <span>+ </span>
        New project
      </button>
    </div>
  );
};

const mdtp = dispatch => bindActionCreators({
  newProjectModalAction: newProjectModal,
}, dispatch);

export default connect(null, mdtp)(SideBar);

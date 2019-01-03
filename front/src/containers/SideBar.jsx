import React from 'react';
import './SideBar.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newProjectModal, filterType } from '../actions';

const SideBar = (props) => {
  const { newProjectModalAction, filterTypeRedux } = props;
  return (
    <div className="SideBar">
      <div className="filters">
        <h2>Sort layers by</h2>
        <button type="submit" onClick={() => filterTypeRedux('All')} className="filter">All</button>
        <button type="submit" onClick={() => filterTypeRedux('Miscellaneous')} className="filter">Miscellaneous</button>
        <button type="submit" onClick={() => filterTypeRedux('Machine')} className="filter">Machine</button>
        <button type="submit" onClick={() => filterTypeRedux('Software')} className="filter">Software</button>
        <button type="submit" onClick={() => filterTypeRedux('Distribution')} className="filter">Distribution</button>
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
  filterTypeRedux: filterType,
}, dispatch);

export default connect(null, mdtp)(SideBar);

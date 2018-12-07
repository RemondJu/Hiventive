import React from 'react';
import NavBar from '../../containers/NavBar';
import SideBar from '../../containers/SideBar';
import LayersDisplay from '../../containers/LayersDisplay';
import './ToolPage.scss';

const ToolPage = () => (
  <div className="ToolPage">
    <NavBar />
    <div className="toolRow">
      <SideBar />
      <LayersDisplay />
    </div>
  </div>
);

export default ToolPage;

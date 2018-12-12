import React from 'react';
import SideBar from '../../containers/SideBar';
import LayersDisplay from '../../containers/LayersDisplay';
import './ToolPage.scss';

const ToolPage = () => (
  <div className="ToolPage">
    <div className="toolRow">
      <SideBar />
      <LayersDisplay />
    </div>
  </div>
);

export default ToolPage;

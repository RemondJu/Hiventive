import React from 'react';
import './LayerInfos.scss';
import { NavLink } from 'react-router-dom';

const LayerInfos = () => (
  <div className="layerInfos">
    <NavLink to="/ToolPage">
      <button className="button" type="button">Back</button>
    </NavLink>
    <h2><strong>meta-ti / version: rocko</strong></h2>
    <h3>Distribution</h3>
  </div>

);


export default LayerInfos;

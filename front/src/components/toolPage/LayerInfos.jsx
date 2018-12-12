import React from 'react';
import './LayerInfos.scss';
import { NavLink } from 'react-router-dom';

const LayerInfos = () => (
  <div className="layerInfos">
    <NavLink to="/ToolPage">
      <button className="button" type="button">Back</button>
    </NavLink>
  </div>

);


export default LayerInfos;

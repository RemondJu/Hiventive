import React from 'react';
import './LayerInfos.scss';
import { NavLink } from 'react-router-dom';
import NavBar from '../../containers/NavBar';

const LayerInfos = () => (
  <div className="layerInfos">
    <NavLink to="/ToolPage">
      <button className="button" type="submit">Back</button>
    </NavLink>
  </div>

);


export default LayerInfos;

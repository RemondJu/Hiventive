import React from 'react';
import './LayerFromCatalog.scss';
import { NavLink } from 'react-router-dom';
import info from '../images/info.png';

const LayerFromCatalog = () => (
  <div className="LayerFromCatalog">
    <tr className="Layer">
      <NavLink to="/LayerInfos">
        <td className="imageRow">
          <img className="info" alt="logo_info" src={info} />
        </td>
      </NavLink>
      <td>Name</td>
      <td>Description</td>
      <td>Maintainer</td>
      <td>Repository</td>
    </tr>
  </div>
);

export default LayerFromCatalog;

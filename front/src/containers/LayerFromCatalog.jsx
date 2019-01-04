import React from 'react';
import './LayerFromCatalog.scss';
import { NavLink } from 'react-router-dom';

import info from '../images/info.png';


const LayerFromCatalog = (props) => {
  const {
    name, description, url, repository,
  } = props;

  return (
    <div className="LayerFromCatalog">
      <tr className="Layer">
        <NavLink to="/LayerInfos">
          <td className="imageRow">
            <img className="info" alt="logo_info" src={info} />
          </td>
        </NavLink>
        <td>{name}</td>
        <td>{description}</td>
        <td>{url}</td>
        <td>{repository}</td>
      </tr>
    </div>
  );
};

export default LayerFromCatalog;

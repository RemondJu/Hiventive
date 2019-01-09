import React from 'react';
import './LayerFromCatalog.scss';
import { NavLink } from 'react-router-dom';

import info from '../images/info.png';
import publiclayer from '../images/publiclayer.png';
import privatelayer from '../images/privatelayer.png';


const LayerFromCatalog = (props) => {
  const {
    name, description, url, repository, share,
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
        <td> 
          <img 
            className="isShare"
            src={share ? publiclayer : privatelayer}
            alt="pp"
          />
        </td>
      </tr>
    </div>
  );
};

export default LayerFromCatalog;

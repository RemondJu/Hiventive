import React from 'react';
import './LayerFromCatalog.scss';
import info from '../images/info.png';

const LayerFromCatalog = () => (
  <div className="LayerFromCatalog">
    <tr className="Layer">
      <td className="imageRow">  
        <img className="info" alt="logo_info" src={info} /> 
      </td>
      <td>Name</td>
      <td>Description</td>
      <td>Maintainer</td>
      <td>Repository</td>
    </tr>
  </div>
);

export default LayerFromCatalog;

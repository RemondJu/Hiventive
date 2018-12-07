import React from 'react';
import './LayersDisplay.scss';
import LayerFromCatalog from './LayerFromCatalog';

const LayersDisplay = () => (
  <div className="LayersDisplay">
    <table className="layersTitles">
      <tr>
        <th />
        <th>Layer name</th>
        <th>Description</th>
        <th>Maintainer</th>
        <th>Repository</th>
      </tr>
      <div className="layersScrolling">
        <LayerFromCatalog />
        <LayerFromCatalog />
        <LayerFromCatalog />
        <LayerFromCatalog />
        <LayerFromCatalog />
        <LayerFromCatalog />
        <LayerFromCatalog />
        <LayerFromCatalog />
      </div>
    </table>
  </div>
);
export default LayersDisplay;

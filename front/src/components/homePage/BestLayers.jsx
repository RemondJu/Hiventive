import React from 'react';
import CardBestLayer from './CardBestLayer';
import './BestLayers.scss';

const BestLayers = () => (
  <div className="BestLayers">
    <h2 className="titlebest">Most downloaded layers</h2>
    <div className="layers">
      <CardBestLayer
        nameLayer="meta-ti / version: rocko"
        description="Texas Instruments board support (official)"
        type="Distribution"
        download=" 540"
        view=" 777"
        date="2015-01-27"
        user=" Denys Dmytriyenko"
        className="layer"
      />
      <CardBestLayer
        nameLayer="meta-intel / version: dylan"
        description="Intel board support common layer (official)"
        type="Software"
        download=" 430"
        view=" 540"
        date="2012-08-17"
        user=" Nitin A Kamble"
        className="layer"
      />
      <CardBestLayer
        nameLayer="meta-arago-distro / version: morty"
        description="Arago/TI-SDK distribution"
        type="Machine (BSP)"
        download=" 399"
        view=" 521"
        date="2015-09-22"
        user=" Denys Dmytriyenko"
        className="layer"
      />
    </div>
    <h2 className="titlebest">Latest OS</h2>
    <div className="layers">
      <CardBestLayer
        nameLayer="meta-intel / version: pyro "
        description="Intel board support common layer (official)"
        type="Machine (BSP)"
        download=" 10"
        view=" 21"
        date="2018-11-22"
        user=" Saul Wold"
        className="layer"
      />
      <CardBestLayer
        nameLayer="meta-yocto-bsp / version: rocko"
        description="BSP layer for Yocto Project reference hardware"
        type="Distribution"
        download=" 7"
        view=" 11"
        date="2018-12-05"
        user="Richard Purdie"
        className="layer"
      />
      <CardBestLayer
        nameLayer="meta-intel / version: rocko"
        description="Yocto layer to support cross
      compiler creation for exotic or foreign Intel
      board support common layer (official)"
        type="Software"
        download=" 5"
        view=" 8"
        date="2018-12-07"
        user=" Saul Wold"
        className="layer"
      />
    </div>
  </div>
);

export default BestLayers;

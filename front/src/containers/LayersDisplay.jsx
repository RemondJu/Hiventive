import React, { Component } from 'react';
import './LayersDisplay.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { layersFetchData } from '../actions/fetch';
import LayerFromCatalog from './LayerFromCatalog';


class LayersDisplay extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData('http://localhost:4000/hiventive/api/all-layers');
  }

  render() {
    const { layers } = this.props;
    return (
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
            {layers.map(layer => (
              <LayerFromCatalog
                name={layer.name}
                description={layer.description}
                url={layer.url}
                repository={layer.hostSite}
              />
            ))}
          </div>
        </table>
      </div>
    );
  }
}

function mstp(state) {
  return {
    layers: state.layersFetchDataSuccess,
    error: state.layersHasErrored,
    loading: state.layersIsLoading,
  };
}

function mdtp(dispatch) {
  return bindActionCreators({ fetchData: layersFetchData }, dispatch);
}


export default connect(mstp, mdtp)(LayersDisplay);

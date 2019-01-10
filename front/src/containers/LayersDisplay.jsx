import React, { Component } from 'react';
import './LayersDisplay.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { layersFetchData } from '../actions/fetch';
import LayerFromCatalog from './LayerFromCatalog';
import { filterType } from '../actions';
import API_SERVER from '../constants';


class LayersDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchData, location, filterTypeRedux } = this.props;
    if (location.state !== undefined) {
      fetchData(`${API_SERVER}/layers`);
    }
    filterTypeRedux('All');
  }

  render() {
    const { layers, typeFilter } = this.props;
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
            {layers.filter(element => element.type === typeFilter || typeFilter === 'All').map(layer => (
              <LayerFromCatalog
                id={layer.id}
                name={layer.name}
                description={layer.description}
                url={layer.url}
                repository={layer.hostSite}
                share={layer.share}
              />
            ))}
          </div>
        </table>
      </div>
    );
  }
}

const mstp = state => ({
  layers: state.layersFetchDataSuccess,
  error: state.layersHasErrored,
  loading: state.layersIsLoading,
  typeFilter: state.typeFilter,
});

const mdtp = dispatch => bindActionCreators({
  fetchData: layersFetchData,
  filterTypeRedux: filterType,
}, dispatch);


export default withRouter(connect(mstp, mdtp)(LayersDisplay));

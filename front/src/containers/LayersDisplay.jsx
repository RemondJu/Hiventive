import React, { Component } from 'react';
import './LayersDisplay.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { layersFetchData, fetchCategoriesLayer } from '../actions/fetch';
import LayerFromCatalog from './LayerFromCatalog';
import { filterType, newProjectModal } from '../actions';
import API_SERVER from '../constants';
import SideBarDefault from '../components/toolPage/SideBarDefault';

class LayersDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      fetchData,
      location,
      filterTypeRedux,
      fetchCategoriesLayerRedux,
    } = this.props;
    if (location.state !== undefined) {
      fetchData(`${API_SERVER}/layers`);
    }
    filterTypeRedux('All');
    fetchCategoriesLayerRedux();
  }

  render() {
    const {
      layers,
      typeFilter,
      newProjectModalAction,
      filterTypeRedux,
      categoryLayer,
      activeProjectId,
    } = this.props;
    return (
      <div className="LayersDisplay">
        <SideBarDefault>
          <div className="filters">
            {activeProjectId ? (
              <h2 className="activeProject">
            PROJECT
                {activeProjectId}
              </h2>
            ) : '' }
            <h2>Sort layers by</h2>
            <button type="button" onClick={() => filterTypeRedux('All')} className="filter">All</button>
            {(categoryLayer.categories !== undefined)
              ? categoryLayer.categories.map(type => <button type="button" onClick={() => filterTypeRedux(type.type)} className="filter">{type.type}</button>)
              : '. . .'}
          </div>
          <button className="button_new_project" type="button" onClick={newProjectModalAction}>
            + New project
          </button>
        </SideBarDefault>
        <table className="layersTitles">
          <h1 className="title-page">Layers</h1>
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
                key={layer.id}
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

LayersDisplay.defaultProps = {
  layers: [],
  typeFilter: '',
  categoryLayer: {},
};

LayersDisplay.propTypes = {
  // Props type shape
  layers: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  typeFilter: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  categoryLayer: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
  }),
  // Props type func
  fetchData: PropTypes.func.isRequired,
  filterTypeRedux: PropTypes.func.isRequired,
  newProjectModalAction: PropTypes.func.isRequired,
  fetchCategoriesLayerRedux: PropTypes.func.isRequired,

};

const mstp = state => ({
  layers: state.layersFetchDataSuccess,
  typeFilter: state.typeFilter,
  categoryLayer: state.categoryLayer,
  activeProjectId: state.activeProjectId,
});

const mdtp = dispatch => bindActionCreators({
  fetchData: layersFetchData,
  filterTypeRedux: filterType,
  newProjectModalAction: newProjectModal,
  fetchCategoriesLayerRedux: fetchCategoriesLayer,
}, dispatch);


export default withRouter(connect(mstp, mdtp)(LayersDisplay));

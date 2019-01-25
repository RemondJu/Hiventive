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
import SideBarDefault from '../components/SideBarDefault';

class LayersDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareFilter: 1,
      displayPublicPrivate: true,
      nbLayersShow: 5,
    };
    this.showPrivateLayers = this.showPrivateLayers.bind(this);
    this.showPublicLayers = this.showPublicLayers.bind(this);
    this.showAllLayers = this.showAllLayers.bind(this);
    this.moreLayers = this.moreLayers.bind(this);
  }

  componentDidMount() {
    const {
      fetchData,
      filterTypeRedux,
      fetchCategoriesLayerRedux,
    } = this.props;
    fetchData(`${API_SERVER}/layers`);
    filterTypeRedux('All');
    fetchCategoriesLayerRedux();
  }

  showPrivateLayers() {
    this.setState({
      shareFilter: 0,
      displayPublicPrivate: false,
    });
  }

  showPublicLayers() {
    this.setState({
      shareFilter: 1,
      displayPublicPrivate: false,
    });
  }

  showAllLayers() {
    this.setState({
      displayPublicPrivate: true,
    });
  }

  moreLayers() {
    this.setState(prevState => ({
      nbLayersShow: prevState.nbLayersShow + 5,
    }));
  }

  render() {
    const { nbLayersShow } = this.state;
    const {
      layers,
      typeFilter,
      newProjectModalAction,
      filterTypeRedux,
      categoryLayer,
      projectUser,
      activeProjectId,
    } = this.props;
    const pos = activeProjectId !== 0 ? projectUser.map(el => el.id).indexOf(activeProjectId) : 0;
    const { displayPublicPrivate, shareFilter } = this.state;
    return (

      <div className="LayersDisplay">
        <SideBarDefault title={projectUser[0] ? (
          <h2 className="activeProject">
            {`Project ${projectUser[pos].name}`}
          </h2>
        ) : ''}
        >
          <div className="filters">
            <h2>Filters</h2>
            <ul className="projects-list">
              <button type="button" onClick={() => filterTypeRedux('All')} className="filter">All</button>
              {(categoryLayer.categories !== undefined)
                ? categoryLayer.categories.map(type => <li><button type="button" onClick={() => filterTypeRedux(type.type)} className="filter">{type.type}</button></li>)
                : '. . .'}
            </ul>
          </div>
          <button className="button_new_project" type="button" onClick={newProjectModalAction}>
            + New project
          </button>
        </SideBarDefault>
        <table className="layersTitles">
          <h1 className="title-page">Layers</h1>
          <button type="button" onClick={this.showPrivateLayers} className="priv-pub-button">private</button>
          <button type="button" onClick={this.showPublicLayers} className="priv-pub-button">public</button>
          <button type="button" onClick={this.showAllLayers} className="priv-pub-button">all</button>
          <tr>
            <th />
            <th>Name</th>
            <th>Description</th>
            <th>Url</th>
            <th>Repository</th>
            <th>Shared</th>
          </tr>
          <div className="layersScrolling">
            <div className="layers-cage">
              {layers.length !== 0 ? layers.filter(element => element.type === typeFilter || typeFilter === 'All').filter(element => (displayPublicPrivate ? element : element.share === shareFilter)).map(layer => (
                <LayerFromCatalog
                  key={layer.id}
                  id={layer.id}
                  name={layer.name}
                  description={layer.description}
                  url={layer.url}
                  repository={layer.hostSite}
                  share={layer.share}
                />
              )).slice(0, nbLayersShow) : (
                <p>
              No layers loaded.
                  <span aria-label="cryEmoji" role="img"> 😭 </span>
              Refresh the page!
                  <span aria-label="cryEmoji" role="img"> 🔁 </span>
                </p>
              ) }
              <button type="button" onClick={() => this.moreLayers()}>More layers </button>
            </div>
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
  projectUser: state.projectUser,
  activeProjectId: state.activeProjectId,
});

const mdtp = dispatch => bindActionCreators({
  fetchData: layersFetchData,
  filterTypeRedux: filterType,
  newProjectModalAction: newProjectModal,
  fetchCategoriesLayerRedux: fetchCategoriesLayer,
}, dispatch);


export default withRouter(connect(mstp, mdtp)(LayersDisplay));

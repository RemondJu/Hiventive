import React, { Component } from 'react';
import './LayersDisplay.scss';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchCategoriesLayer, fetchSearchLayer } from '../actions/fetch';
import LayerFromCatalog from './LayerFromCatalog';
import { filterType, newProjectModal, enableRefresh } from '../actions';
import SideBarDefault from '../components/SideBarDefault';

class LayersDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareFilter: 1,
      displayPublicPrivate: true,
      nbLayersShow: 4,
    };
    this.showPrivateLayers = this.showPrivateLayers.bind(this);
    this.showPublicLayers = this.showPublicLayers.bind(this);
    this.showAllLayers = this.showAllLayers.bind(this);
    this.moreLayers = this.moreLayers.bind(this);
  }

  componentDidMount() {
    const {
      filterTypeRedux,
      fetchCategoriesLayerRedux,
      fetchSearchLayerRedux,
      wordFilter,
    } = this.props;
    fetchSearchLayerRedux(wordFilter);
    filterTypeRedux('All');
    fetchCategoriesLayerRedux();
  }

  componentDidUpdate() {
    const { wordFilter, fetchSearchLayerRedux, refreshFetch } = this.props;
    if (refreshFetch) {
      fetchSearchLayerRedux(wordFilter);
    }
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
      nbLayersShow: prevState.nbLayersShow + 3,
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
      activeProjectName,
    } = this.props;
    const { displayPublicPrivate, shareFilter } = this.state;
    return (
      <div className="LayersDisplay">
        <SideBarDefault>
          <div className="filters">
            <h2>Filters</h2>
            <ul className="projects-list">
              <button type="button" onClick={() => filterTypeRedux('All')} className="filter">All layers</button>
              {(categoryLayer !== undefined)
                ? categoryLayer.map(type => <li key={type.id}><button type="button" onClick={() => filterTypeRedux(type.type)} className="filter">{type.type}</button></li>)
                : '. . .'}
            </ul>
          </div>
          <button className="button_new_project" type="button" onClick={newProjectModalAction}>
            Create project
          </button>
          <p>OR</p>
          <div>
            {activeProjectName !== '' ? (
              <Link className="active_project" to="/project-page"><button type="button">{`Go to ${activeProjectName}`}</button></Link>) : <Link className="active_project" to="/project-page"><button type="button">Select a project</button></Link>}
          </div>
        </SideBarDefault>
        <table className="layersTitles">
          <h2 className="title-page">Layers Catalog</h2>
          <button type="button" onClick={this.showPrivateLayers} className="priv-pub-button">private</button>
          <button type="button" onClick={this.showPublicLayers} className="priv-pub-button">public</button>
          <button type="button" onClick={this.showAllLayers} className="priv-pub-button">all</button>
          <div className="titreTable">
            <tr>
              <th />
              <th>Name</th>
              <th>Description</th>
              <th>Url</th>
              <th>Repository</th>
              <th>Shared</th>
            </tr>
          </div>
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

              )}
              {(layers.length === 0 || layers.length < nbLayersShow) ? '' : <button type="button" onClick={() => this.moreLayers()}>More layers </button>}
            </div>
            <br />
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
  activeProjectName: '',
};

LayersDisplay.propTypes = {
  // Props type shape
  layers: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  })),
  typeFilter: PropTypes.string,
  categoryLayer: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
  })),
  // Props type func
  fetchSearchLayerRedux: PropTypes.func.isRequired,
  filterTypeRedux: PropTypes.func.isRequired,
  newProjectModalAction: PropTypes.func.isRequired,
  fetchCategoriesLayerRedux: PropTypes.func.isRequired,
  // Props type string
  activeProjectName: PropTypes.string,
};

const mstp = state => ({
  layers: state.layersFetchDataSuccess,
  typeFilter: state.typeFilter,
  categoryLayer: state.categoryLayer,
  activeProjectName: state.activeProjectName,
  activeProjectId: state.activeProjectId,
  wordFilter: state.wordFilter,
  refreshFetch: state.refreshFetch,
});

const mdtp = dispatch => bindActionCreators({
  filterTypeRedux: filterType,
  newProjectModalAction: newProjectModal,
  fetchCategoriesLayerRedux: fetchCategoriesLayer,
  fetchSearchLayerRedux: fetchSearchLayer,
  enableRefreshAction: enableRefresh,
}, dispatch);


export default withRouter(connect(mstp, mdtp)(LayersDisplay));

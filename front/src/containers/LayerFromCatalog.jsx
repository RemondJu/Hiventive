import React, { Component } from 'react';
import './LayerFromCatalog.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  Col, Row,
} from 'reactstrap';
import { enableRefresh } from '../actions';
import { fetchLayersFromActiveProject } from '../actions/fetch';
import info from '../images/info.png';
import privatelayer from '../images/privatelayer.png';
import API_SERVER from '../constants';

class LayerFromCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layerAdded: false,
    };
    this.addLayerToProject = this.addLayerToProject.bind(this);
  }

  componentDidMount() {
    const { activeProjectId, id } = this.props;
    fetch(`${API_SERVER}/project-layers/${activeProjectId}/${id}`)
      .then(res => res.json())
      .then(data => (data === 'false' ? this.setState({ layerAdded: true }) : ''))
      .catch();
  }

  componentDidUpdate() {
    const { fetchLayersFromActiveProjectAction, activeProjectId } = this.props;
    fetchLayersFromActiveProjectAction(activeProjectId);
  }

  addLayerToProject() {
    const { activeProjectId, id, enableRefreshAction } = this.props;
    const { layerAdded } = this.state;
    if (activeProjectId !== 0) {
      if (!layerAdded) {
        const data = {
          projectId: activeProjectId,
          layerId: id,
        };
        const config = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        fetch(`${API_SERVER}/project-layer`, config)
          .then(enableRefreshAction)
          .then(this.setState({
            layerAdded: !layerAdded,
          }))
          .catch();
      } else {
        const config = {
          method: 'DELETE',
        };
        fetch(`${API_SERVER}/project-layer/${id}`, config)
          .then(enableRefreshAction)
          .then(this.setState({
            layerAdded: !layerAdded,
          }))
          .catch();
      }
    }
  }

  render() {
    const {
      id, name, description, url, share,
    } = this.props;
    const { layerAdded } = this.state;
    return (
      <Row className="LayerFromCatalog">
        <Col sm="1">
          <NavLink className="info-button" to={`/layerinfos/${id}`}>
            <div className="imageRow" title="More information about the layer">
              <img className="info" alt="logo_info" src={info} />
            </div>
          </NavLink>
        </Col>
        <Col sm="1">
          {share
            ? ''
            : <img className="isShare text_row" src={privatelayer} alt="private" />
          }
        </Col>
        <Col sm="2" className=" text_row">{name}</Col>
        <Col sm="4" className=" text_row">{description.length > 75 ? `${description.slice(0, 75)} ...` : description}</Col>
        <Col sm="3" className=" text_row">{url}</Col>

        <Col sm="1"><button title={layerAdded ? 'Remove a layer in your project' : 'Adding a layer in your project'} className="add-remove-button" type="button" onClick={this.addLayerToProject}>{layerAdded ? 'RMV' : 'ADD'}</button></Col>
      </Row>
    );
  }
}

LayerFromCatalog.propTypes = {
  activeProjectId: PropTypes.number,
  fetchLayersFromActiveProjectAction: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  share: PropTypes.number,
};

LayerFromCatalog.defaultProps = {
  activeProjectId: 0,
  id: 1,
  name: 'layer name',
  description: 'layer description',
  url: 'layer url',
  share: 1,
};

const mstp = state => ({
  refreshFetch: state.refreshFetch,
  activeProjectId: state.activeProjectId,
});

const mdtp = dispatch => bindActionCreators({
  enableRefreshAction: enableRefresh,
  fetchLayersFromActiveProjectAction: fetchLayersFromActiveProject,
}, dispatch);

export default connect(mstp, mdtp)(LayerFromCatalog);

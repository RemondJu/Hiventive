import React, { Component } from 'react';
import './LayerFromCatalog.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import info from '../images/info.png';
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
    const { activeProject, id } = this.props;

    fetch(`${API_SERVER}/project-layers/${activeProject.id}/${id}`)
      .then(res => res.json())
      .then(data => (data === 'false' ? this.setState({ layerAdded: true }) : ''))
      .catch();
  }

  addLayerToProject() {
    const { activeProject, id } = this.props;
    const { layerAdded } = this.state;
    if (activeProject.id !== undefined) {
      if (!layerAdded) {
        const data = {
          projectId: activeProject.id,
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
          .then(this.setState({
            layerAdded: !layerAdded,
          }))
          .catch();
      } else {
        const config = {
          method: 'DELETE',
        };
        fetch(`${API_SERVER}/project-layer/${id}`, config)
          .then(this.setState({
            layerAdded: !layerAdded,
          }))
          .catch();
      }
    }
  }

  render() {
    const {
      name, description, url, repository,
    } = this.props;
    const { layerAdded } = this.state;
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
          <td><button type="button" onClick={this.addLayerToProject}>{layerAdded ? '-' : '+'}</button></td>
        </tr>
      </div>
    );
  }
}

const mstp = state => ({
  activeProject: state.activeProject,
});

export default connect(mstp)(LayerFromCatalog);

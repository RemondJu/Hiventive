import React, { Component } from 'react';
import './LayerFromCatalog.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import info from '../images/info.png';
import publiclayer from '../images/publiclayer.png';
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

  addLayerToProject() {
    const { activeProjectId, id } = this.props;
    const { layerAdded } = this.state;
    if (activeProjectId !== undefined) {
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
      id, name, description, url, repository, share,
    } = this.props;
    const { layerAdded } = this.state;
    return (
      <div className="LayerFromCatalog">
        <tr className="Layer">
          <NavLink to={`/layerinfos/${id}`}>
            <td className="imageRow">
              <img className="info" alt="logo_info" src={info} />
            </td>
          </NavLink>
          <td>{name}</td>
          <td>{description}</td>
          <td>{url}</td>
          <td>{repository}</td>
          <td>
            <img
              className="isShare"
              src={share ? publiclayer : privatelayer}
              alt="pp"
            />
          </td>
          <td><button type="button" onClick={this.addLayerToProject}>{layerAdded ? '-' : '+'}</button></td>
        </tr>
      </div>
    );
  }
}

const mstp = state => ({
  activeProjectIdId: state.activeProjectIdId,
});

export default connect(mstp)(LayerFromCatalog);

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
      id, name, description, url, repository, share,
    } = this.props;
    const { layerAdded } = this.state;
    return (
      <div className="LayerFromCatalog">
        <tr className="Layer">
          <NavLink className="test" to={`/layerinfos/${id}`}>
            <td className="imageRow">
              <img className="info" alt="logo_info" src={info} />
            </td>
          </NavLink>
          <td className="tableText">{name}</td>
          <td className="tableDescription">{description.length > 50 ? `${description.slice(0, 22)} ...` : description }</td>
          <td className="tableText">{url}</td>
          <td className="tableText">{repository}</td>
          <td className="tableText">
            <img
              className="isShare"
              src={share ? publiclayer : privatelayer}
              alt="pp"
            />
          </td>
          <td><button className="add-remove-button" type="button" onClick={this.addLayerToProject}>{layerAdded ? '-' : '+'}</button></td>
        </tr>
      </div>
    );
  }
}

const mstp = state => ({
  activeProject: state.activeProject,
});

export default connect(mstp)(LayerFromCatalog);

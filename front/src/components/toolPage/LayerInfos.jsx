import React, { Component } from 'react';
import './LayerInfos.scss';
import { NavLink } from 'react-router-dom';

class LayerInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchLayerDetail } = this.props;
    fetchLayerDetail(this.params.id);
  }

  render() {
    return (
      <div className="layerInfos">
        <NavLink to="/ToolPage">
          <button className="button" type="button">
            Back
          </button>
        </NavLink>
        <h3>Name</h3>
        <p>description</p>
        <p>url</p>
        <p>repository</p>
      </div>
    );
  }
}


export default LayerInfos;

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import BackButton from '../components/BackButton';
import { fetchLayerInfos } from '../actions/fetch';
import API_SERVER from '../constants';

import './LayerInfos.scss';

class LayerInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boolButtonDelete: false,
      boolButtonEdite: false,
      layerName: '',
      version: '',
      url: '',
      hostSite: '',
      description: '',
      layerTypeID: '',
      share: false,
    };
    this.changeDeleteButton = this.changeDeleteButton.bind(this);
    this.deleteLayer = this.deleteLayer.bind(this);
    this.changeDeleteButtonMouseOut = this.changeDeleteButtonMouseOut.bind(this);
    this.addLayerView = this.addLayerView.bind(this);
    this.editMode = this.editMode.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.inputChangeCheckbox = this.inputChangeCheckbox.bind(this);
    this.sendEdit = this.sendEdit.bind(this);
    this.editModeOff = this.editModeOff.bind(this);
  }

  componentDidMount() {
    const { match, fetchData } = this.props;
    fetchData(match.params.id);
    this.addLayerView();
    this.setState({
      boolButtonDelete: false,
      boolButtonEdite: false,
    });
  }

  addLayerView() {
    const { match } = this.props;
    const config = {
      method: 'PUT',
    };
    fetch(`${API_SERVER}/layer-view-counter/${parseInt((match.params.id), 10)}`, config);
  }

  deleteLayer() {
    const { match, history } = this.props;
    const conf = {
      method: 'DELETE',
    };
    fetch(`${API_SERVER}/layer/${match.params.id}`, conf)
      .then(() => history.goBack());
  }

  changeDeleteButton() {
    this.setState({
      boolButtonDelete: true,
    });
  }

  changeDeleteButtonMouseOut() {
    this.setState({
      boolButtonDelete: false,
    });
  }

  editMode() {
    const { layer } = this.props;
    this.setState({
      boolButtonEdite: true,
      layerName: layer.layerName,
      version: layer.version,
      url: layer.url,
      hostSite: layer.hostSite,
      description: layer.description,
      share: layer.share,
      layerTypeID: layer.typeID,
    });
  }

  editModeOff() {
    this.setState({
      boolButtonEdite: false,
    });
  }

  inputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  inputChangeCheckbox() {
    this.setState(prevState => ({
      share: !prevState.share,
    }));
  }

  sendEdit(event) {
    event.preventDefault();
    const { history, match } = this.props;
    const {
      layerName,
      version,
      url,
      hostSite,
      description,
      layerTypeID,
      share,
    } = this.state;
    const dataSend = {
      name: layerName,
      version,
      url,
      hostSite,
      description,
      layerTypeID,
      share,
    };
    const conf = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    };
    fetch(`${API_SERVER}/layer/${match.params.id}`, conf)
      .then(() => history.goBack());
  }

  render() {
    const { layer, categoryLayer } = this.props;
    const {
      boolButtonDelete,
      boolButtonEdite,
      layerName,
      version,
      url,
      hostSite,
      description,
      layerTypeID,
      share,
    } = this.state;
    const textButtonDelete = boolButtonDelete ? 'Click twice to delete' : 'Delete your layer';
    const doubleClickForDelete = boolButtonDelete ? () => this.deleteLayer() : () => { };
    return (
      <div className="LayerInfos">
        <Container className="card_layer">
          <form>
            <Row>
              <Col className="pageHeader mt-4 mr-2 ml-2 mb-2">
                <div className="container_button">
                  {boolButtonEdite ? (
                    <button
                      className="button_display_submit"
                      type="button"
                      onClick={this.sendEdit}
                    >
                      Submit changes
                    </button>
                  ) : (
                    <button
                      className="button_display"
                      type="button"
                      onClick={() => this.editMode()}
                    >
                      <span>
                      Edit your layer
                      </span>
                    </button>
                  )
                }
                </div>
              </Col>
              <Col className="pageHeader mt-4 mr-2 ml-2 mb-2">
                <div className="container_button">
                  <button
                    className="button_display"
                    type="button"
                    onMouseOut={this.changeDeleteButtonMouseOut}
                    onClick={() => this.changeDeleteButton()}
                    onDoubleClick={doubleClickForDelete}
                  >
                    <span>{textButtonDelete}</span>
                  </button>
                </div>
              </Col>
              <BackButton />
            </Row>

            <div className="cardCss">
              <Row>
                <Col className="pageHeader mt-5 ml-5 mb-3" sm="auto" md="auto">
                  <h2 className="titleLayerInfo">LAYER DETAIL</h2>
                </Col>
              </Row>
              <Row>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Name :
                    {' '}
                    {boolButtonEdite ? (
                      <label className="label_input" htmlFor="layerName">
                        <input className="login_input" required name="layerName" id="layerName" onChange={this.inputChange} value={layerName} type="text" />
                      </label>
                    ) : (<span className="nameLayerInfo">{layer.layerName}</span>)}
                  </p>
                </Col>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Type :
                    {' '}
                    {boolButtonEdite ? (
                      <select className="select_input" name="layerTypeID" id="layerTypeID" onChange={this.inputChange}>
                        <option value={layerTypeID}>{layer.type}</option>
                        {categoryLayer.length === 0 ? '...' : categoryLayer.map(category => <option key={category.id} value={category.id}>{category.type}</option>)}
                      </select>
                    ) : (<span className="elementLayerInfo">{layer.type}</span>)}
                  </p>
                </Col>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Version :
                    {' '}
                    {boolButtonEdite ? (
                      <label className="label_input" htmlFor="version">
                        <input className="login_input" required name="version" id="version" onChange={this.inputChange} value={version} type="text" />
                      </label>
                    ) : (<span className="elementLayerInfo">{layer.version}</span>)}
                  </p>
                </Col>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Share :
                    {' '}
                    {boolButtonEdite ? (
                      <button className="button_checbox" type="button" onClick={() => this.inputChangeCheckbox()}>{share ? 'Public' : 'Private'}</button>
                    ) : (<span className="elementLayerInfo">{layer.share ? 'Public' : 'Private'}</span>)}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Host site :
                    {' '}
                    {boolButtonEdite ? (
                      <label className="label_input" htmlFor="hostSite">
                        <input className="login_input" required name="hostSite" id="hostSite" onChange={this.inputChange} value={hostSite} type="text" />
                      </label>
                    ) : (<span className="urlLayerInfo">{layer.hostSite}</span>)}
                  </p>
                </Col>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Owner :
                    {' '}
                    <span className="elementLayerInfo">{layer.userName}</span>
                  </p>
                </Col>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Download :
                    {' '}
                    <span className="elementLayerInfo">{layer.downloadsCounter}</span>
                  </p>
                </Col>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    View :
                    {' '}
                    <span className="elementLayerInfo">{layer.viewsCounter}</span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    URL :
                    {' '}
                    {boolButtonEdite ? (
                      <label className="label_input" htmlFor="url">
                        <input className="login_input" required name="url" id="url" onChange={this.inputChange} value={url} type="text" />
                      </label>
                    ) : (<span><a className="urlLayerInfo" href={layer.url} rel="noopener noreferrer" target="_blank">{layer.url}</a></span>)}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="pageHeader mb-5 mt-2 ml-5" sm="auto" md="auto">
                  <p className="titleSecLayerInfo">
                    Description :
                    {' '}
                    {boolButtonEdite ? (
                      <p>
                        <label className="label_input" htmlFor="description">
                          <textarea className="text_area_input" name="description" id="description" onChange={this.inputChange} value={description} />
                        </label>
                      </p>
                    ) : (<p className="elementLayerInfo">{layer.description}</p>)}
                  </p>
                </Col>
              </Row>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

LayerInfos.propTypes = {
  layer: PropTypes.shape({
    description: PropTypes.string,
    downloadsCounter: PropTypes.number,
    hostSite: PropTypes.string,
    id: PropTypes.number,
    imported: PropTypes.number,
    layerName: PropTypes.string,
    share: PropTypes.number,
    type: PropTypes.string,
    typeID: PropTypes.number,
    url: PropTypes.string,
    userName: PropTypes.string,
    version: PropTypes.string,
    viewsCounter: PropTypes.number,
  }).isRequired,
  categoryLayer: PropTypes.arrayOf(PropTypes.shape).isRequired,
  fetchData: PropTypes.func.isRequired,
};

function mstp(state) {
  return {
    layer: state.layer,
    categoryLayer: state.categoryLayer,
  };
}

function mdtp(dispatch) {
  return bindActionCreators({
    fetchData: fetchLayerInfos,
  }, dispatch);
}


export default withRouter(connect(mstp, mdtp)(LayerInfos));

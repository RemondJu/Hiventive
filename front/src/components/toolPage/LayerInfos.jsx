import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import BackButton from './BackButton';
import { fetchLayerInfos } from '../../actions/fetch';
import API_SERVER from '../../constants';
import './LayerInfos.scss';

class LayerInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boolButtonDelete: '',
    };
    this.changeDeleteButton = this.changeDeleteButton.bind(this);
    this.deleteLayer = this.deleteLayer.bind(this);
    this.changeDeleteButtonMouseOut = this.changeDeleteButtonMouseOut.bind(this);
    this.addLayerView = this.addLayerView.bind(this);
  }

  componentDidMount() {
    const { match, fetchData } = this.props;
    fetchData(match.params.id);
    this.addLayerView();
    this.setState({
      boolButtonDelete: false,
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

  render() {
    const { layer } = this.props;
    const { boolButtonDelete } = this.state;
    const textButtonDelete = boolButtonDelete ? 'Double click here for confirm' : 'Delete';
    const doubleClickForDelete = boolButtonDelete ? () => this.deleteLayer() : () => { };
    return (
      <div className="LayerInfos">
        <div className="contentBackButton">
          <BackButton />
        </div>
        <Container className="card_layer">
          <Row>
            <Col className="pageHeader mt-2 ml-5 mb-5" sm="auto" md="auto">
              <h1 className="titleLayerInfo">
                Layer Name :
                {' '}
                <span className="nameLayerInfo">{layer.layerName}</span>
              </h1>
            </Col>
            <Col className="buttons_for_admin mt-2 mr-5 mb-5">
              <button className="button_display" type="button" onClick={() => this.changeDeleteButton()}>
                <span>edit</span>
              </button>
              <button
                className="button_display"
                type="button"
                onMouseOut={this.changeDeleteButtonMouseOut}
                onClick={() => this.changeDeleteButton()}
                onDoubleClick={doubleClickForDelete}
              >
                <span>{textButtonDelete}</span>
              </button>
            </Col>
          </Row>
          <div className="cardCss">
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">
                  Type :
                  {' '}
                  <span className="elementLayerInfo">{layer.type}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">
                  Description :
                  {' '}
                  <span className="elementLayerInfo">{layer.description}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">
                  Owner :
                  {' '}
                  <span className="elementLayerInfo">{layer.userName}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">
                  Version :
                  {' '}
                  <span className="elementLayerInfo">{layer.version}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">
                  url :
                  {' '}
                  <span className="urlLayerInfo">{layer.url}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">
                  repository :
                  {' '}
                  <span className="urlLayerInfo">{layer.hostSite}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">
                  Download :
                  {' '}
                  <span className="elementLayerInfo">{layer.downloadsCounter}</span>
                </p>
              </Col>
            </Row>
            <Row>
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
                  Share :
                  {' '}
                  <span className="elementLayerInfo">{layer.share}</span>
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

function mstp(state) {
  return {
    layer: state.layer,
  };
}

function mdtp(dispatch) {
  return bindActionCreators({
    fetchData: fetchLayerInfos,
  }, dispatch);
}


export default withRouter(connect(mstp, mdtp)(LayerInfos));

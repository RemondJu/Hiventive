import React, { Component } from 'react';
import './LayerInfos.scss';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BackButton from './BackButton';
import { fetchLayerInfos } from '../../actions/fetch';

class LayerInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match, fetchData } = this.props;
    fetchData(match.params.id);
  }

  render() {
    const { layer } = this.props;
    return (
      <div className="LayerInfos">
        <div className="contentBackButton">
          <BackButton />
        </div>
        <Container>
          <Row>
            <Col className="pageHeader mt-2 ml-5 mb-5" sm="auto" md="auto">
              <h1 className="titleLayerInfo">
                Layer Name :
                {' '}
                <span className="nameLayerInfo">{layer.layerName}</span>
              </h1>
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


export default connect(mstp, mdtp)(LayerInfos);

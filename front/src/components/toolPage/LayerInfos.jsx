import React, { Component } from 'react';
import './LayerInfos.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLayerInfos } from '../../actions/fetch';
import { Container, Row, Col } from 'reactstrap';


class LayerInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match, fetchData } = this.props;
    console.log(match.params.id)
    fetchData(match.params.id)

  }

  render() {
    console.log(this.props)
    const { description, downloadsCounter, hostSite, url, version, viewsCounter, share, type, layerName, userName } = this.props.layer
    return (
      <div className="LayerInfos">
        <NavLink to="/ToolPage">
          <Row>
            <Col className="mt-3 ml-5" sm={{ size: 'auto', offset: 1 }}>
              <button className="button" type="button">
               <span className="arrowBack">↩︎</span>
              </button>
            </Col>
          </Row>
        </NavLink>
        <Container >
          <Row>
            <Col className="pageHeader mt-2 ml-5 mb-5" sm="auto" md="auto">
              <h1 className="titleLayerInfo">Layer Name :  <span className="nameLayerInfo">{layerName}</span></h1>
            </Col>
          </Row>
          <div className="cardCss">
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">Type :  <span className="elementLayerInfo">{type}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">Description :  <span className="elementLayerInfo">{description}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">Owner :  <span className="elementLayerInfo">{userName}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">Version :  <span className="elementLayerInfo">{version}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">url :  <span className="urlLayerInfo">{url}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">repository :  <span className="urlLayerInfo">{hostSite}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">Download :  <span className="elementLayerInfo">{downloadsCounter}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">View :  <span className="elementLayerInfo">{viewsCounter}</span></p>
              </Col>
            </Row>
            <Row>
              <Col className="pageHeader mt-2 ml-5" sm="auto" md="auto">
                <p className="titleSecLayerInfo">Share :  <span className="elementLayerInfo">{share}</span></p>
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

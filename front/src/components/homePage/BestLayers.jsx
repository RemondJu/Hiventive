import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CardBestLayer from './CardBestLayer';
import './BestLayers.scss';

const BestLayers = () => (
  <div className="BestLayers">
    <Container fluid className="mt-5 mb-5 ">
      <h2 className="titlebest">Most downloaded layers</h2>
      <Row>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <CardBestLayer
            nameLayer="meta-ti"
            download=" 540"
            view=" 777"
            date="2018-11-22"
            user=" Denys Dmytriyenkokola"
          />
        </Col>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <CardBestLayer
            nameLayer="meta-intel "
            download=" 430"
            view=" 540"
            date="2018-11-22"
            user=" Nitin A Kamble"
          />
        </Col>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <CardBestLayer
            nameLayer="meta-arago-distro"
            download=" 399"
            view=" 521"
            date="2018-11-22"
            user=" Denys Dmytriyenko"
          />
        </Col>
      </Row>
    </Container>
  </div>
);

export default BestLayers;

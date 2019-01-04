import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CardBestLayer from './CardBestLayer';
import './LatestView.scss';

const LatestView = () => (
  <div className="BestLayers">
    <Container fluid className="mt-5 mb-5 ">
      <h2 className="titlebest">Latest OS</h2>
      <Row>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <CardBestLayer
            nameLayer="meta-intel"
            download=" 10"
            view=" 21"
            date="2018-11-22"
            user=" Saul Wold"
          />
        </Col>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <CardBestLayer
            nameLayer="meta-yocto-bsp"
            download=" 7"
            view=" 11"
            date="2018-12-05"
            user="Richard Purdie"
          />
        </Col>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <CardBestLayer
            nameLayer="meta-intel"
            download=" 5"
            view=" 8"
            date="2018-12-07"
            user=" Saul Wold"
          />
        </Col>
      </Row>
    </Container>
  </div>
);

export default LatestView;

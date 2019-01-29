import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CardBestLayer from './CardBestLayer';
import API_SERVER from '../constants';
import './BestLayers.scss';

class BestLayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostdownloaded: [],
    };
  }

  componentDidMount() {
    fetch(`${API_SERVER}/mostdownload/`)
      .then(res => res.json())
      .then(data => this.setState({
        mostdownloaded: data,
      }))
      .catch();
  }

  render() {
    const { mostdownloaded } = this.state;
    return (
      <div className="BestLayers">
        <Container fluid className="mt-lg-5 mb-lg-1 containerbestlayer ">
          <h2 className="titlebest">Most Downloaded layers</h2>
          <Row>
            {
              mostdownloaded.map((element, index) => (
                <Col key={element.id} md={{ size: 4 }} className="mb-1 mt-4 layerCard">
                  <NavLink className="test" to={`/layerinfos/${element.id}`}>
                    <CardBestLayer
                      rank={index + 1}
                      nameLayer={element.name}
                      download={element.mostDownload}
                      view={element.mostView}
                      user={element.alias}
                    />
                  </NavLink>
                </Col>))
            }
          </Row>
        </Container>
      </div>
    );
  }
}

export default BestLayers;

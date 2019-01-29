import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CardBestLayer from './CardBestLayer';
import API_SERVER from '../constants';
import './LatestView.scss';

class LatestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostviews: [],
    };
  }

  componentDidMount() {
    fetch(`${API_SERVER}/mostview/`)
      .then(res => res.json())
      .then(data => this.setState({
        mostviews: data,
      }))
      .catch();
  }

  render() {
    const { mostviews } = this.state;
    return (
      <div className="LatestView">
        <Container fluid className="mt-lg-5 mb-1 ">
          <h2 className="titlebest">Latest View</h2>
          <Row>
            {
              mostviews.map((view, index) => (
                <Col key={view.id} md={{ size: 4 }} className="mb-5 mt-1">
                  <NavLink className="test" to={`/layerinfos/${view.id}`}>
                    <CardBestLayer
                      className="overlay"
                      rank={index + 1}
                      nameLayer={view.name}
                      download={view.mostDownload}
                      view={view.mostView}
                      user={view.alias}
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

export default LatestView;

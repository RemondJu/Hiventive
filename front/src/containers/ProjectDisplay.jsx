import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';

import info from '../images/project.svg';
import './ProjectDisplay.scss';

const ProjectDisplay = (props) => {
  const { name, description } = props;
  return (
    <div className="ProjectDisplay">
      <Container>
        <Link to="/">
          <Row className="row_project">
            <Col sm="4">
              <Row>
                <Col xs="4"><img className="info" alt="logo_info" src={info} /></Col>
                <Col xs="8" className="title_project text_default">{name}</Col>
              </Row>
            </Col>
            <Col sm="8" className="description_project text_default">{description}</Col>
          </Row>
        </Link>
      </Container>
    </div>
  );
};

ProjectDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectDisplay;

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Footer.scss';

const Footer = () => (
  <div className="Footer">
    <Container fluid>
      <Row>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <ul>
            <li><h4 className="titlefooter">Help</h4></li>
            <li>Need Help</li>
            <li>Documentation</li>
          </ul>
        </Col>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <ul>
            <li><h4 className="titlefooter">Informations</h4></li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </Col>
        <Col md={{ size: 4 }} className="mb-4 mt-4">
          <a href="https://github.com/hiventive">
            <img src="http://oddschile.net/logogh.png" alt="GitHub" width="10%" />
          </a>
          <a href="https://twitter.com/hiventive">
            <img src="http://www.ago-formation.fr/wp-content/plugins/nd-shortcodes/addons/customizer/shortcodes/social/img/twitter.svg" alt="Twitter" width="10%" />
          </a>
          <a href="https://www.linkedin.com/company/hiventive/">
            <img src="http://www.ago-formation.fr/wp-content/plugins/nd-shortcodes/addons/customizer/shortcodes/social/img/linkedin.svg" alt="Linkedin" width="10%" />
          </a>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 'auto' }} className="mb-2 mt-4">
          <p className="footerby">
            Made with
            <img src="https://www.freeiconspng.com/uploads/heart-png-26.png" alt="Heart" width="3%" />
            by Bee Polar Team

          </p>
        </Col>
      </Row>

    </Container>
  </div>
);

export default Footer;

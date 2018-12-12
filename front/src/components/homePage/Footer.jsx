import React from 'react';
import './Footer.scss';

const Footer = () => (
  <div className="Footer">
    <div className="footerpart">
      <ul>
        <li><h4 className="titlefooter">Help</h4></li>
        <li>Need Help</li>
        <li>Documentation</li>
      </ul>
    </div>
    <div className="footerpart">
      <ul>
        <li><h4 className="titlefooter">Informations</h4></li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </div>
    <div className="hexagon">
      <div className="hexTop" />
      <div className="hexBottom" />
    </div>
  </div>
);

export default Footer;

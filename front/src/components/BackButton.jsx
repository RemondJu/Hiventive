import React from 'react';
import { NavLink } from 'react-router-dom';
import './BackButton.scss';

const BackButton = () => (
  <div className="BackButton">
    <NavLink to="/ToolPage">
      <button className="button goBack" type="button">
        <span className="arrowBack">↩︎</span>
      </button>
    </NavLink>
  </div>
);

export default BackButton;

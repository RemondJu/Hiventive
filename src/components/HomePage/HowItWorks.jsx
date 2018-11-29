import React from 'react';
import './HowItWorks.scss';
import search from '../../images/search.png';
import signin from '../../images/signin.png';
import build from '../../images/build.png';

const HowItWorks = () => (
  <div className="HowItWorks">
    <h2>How it works ?</h2>
    <div className="circles">
      <div className="circle">
        <img src={signin} alt="signin" width="100%" />
        <h3>Sign in</h3>
      </div>
      <div className="circle">
        <img src={search} alt="search" width="100%" />
        <h3>Search</h3>
      </div>
      <div className="circle">
        <img src={build} alt="build" width="100%" />
        <h3>Build</h3>
      </div>
    </div>
  </div>
);

export default HowItWorks;

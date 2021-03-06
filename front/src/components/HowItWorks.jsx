import React from 'react';
import './HowItWorks.scss';
import Typist from 'react-typist';
import search from '../images/search.png';
import signin from '../images/signin.png';
import build from '../images/build.png';


const HowItWorks = () => (
  <div className="HowItWorks">
    <h2>
      <Typist className="Typist Cursor">
        How it works ? ...
      </Typist>
    </h2>
    <div className="circles">
      <div className="step">
        <div className="circleViolet"><img src={signin} alt="signin" width="100%" /></div>
        <h3 className="HIWTitles">Sign in</h3>
        <p>Join our lovely community and share with us your beautiful layers.</p>
      </div>
      <div className="step">
        <div className="circleBlue"><img src={search} alt="search" width="100%" /></div>
        <h3 className="HIWTitles">Search</h3>
        <p>Amazing layers from yocto and our community.</p>
      </div>
      <div className="step">
        <div className="circleViolet"><img src={build} alt="build" width="100%" /></div>
        <h3 className="HIWTitles">Build</h3>
        <p>Assemble layers to quickly develop awesome projects.</p>
      </div>
    </div>
  </div>
);

export default HowItWorks;

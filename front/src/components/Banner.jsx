import React from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';

const Banner = () => (
  <div className="Banner">
    <h2>
      What is Yocto Builder by Hiventive ?
    </h2>
    <p className="justifytext">
    The Yocto Project is not an embedded Linux Distribution,
    it creates a custom one for you. To help you in this customisation,
    Yocto Builder is a tool aimed to ease the use, generation and the deployment
    of Yocto through an intuitive web application.
    It’s built upon a wide community sharing layers, machines and more in order to reduce effort.
    Create, manage and share your Linux Distribution projects directly on our web application.
    </p>
    <Link to={{
      pathname: '/ToolPage',
      state: {
        whereToArrive: 'home',
      },
    }}
    >
      <button className="button" type="button">Go to app</button>
    </Link>
  </div>
);

export default Banner;

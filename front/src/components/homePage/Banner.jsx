import React from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';

const Banner = () => (
  <div className="Banner">
    <h2>
      What is Hiventive ?
    </h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <Link to={{
      pathname: '/ToolPage',
      state: {
        whereToArrive: 'home',
      },
    }}>
      <button className="button" type="button">Go to app</button>
    </Link>
  </div>
);

export default Banner;

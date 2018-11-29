import React from 'react';
import './Join.scss';
import community from '../../images/community.png';
import connection from '../../images/connection.png';
import help from '../../images/help.png';

const Join = () => (
  <div className="Join">
    <h2>Join our community</h2>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
     dolore eu fugiat nulla pariatur. Excepteur sint occaecat
     cupidatat non proident, sunt in culpa qui officia deserunt
     mollit anim id est laborum.
    </p>
    <div className="circles">
      <div className="circle">
        <img src={community} alt="community" width="100%" />
      </div>
      <div className="circle">
        <img src={connection} alt="connection" width="100%" />
      </div>
      <div className="circle">
        <img src={help} alt="help" width="100%" />
      </div>
    </div>
  </div>
);
export default Join;

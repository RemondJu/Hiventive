import React from 'react';
import './Join.scss';
import community from '../../images/community.png';
import connection from '../../images/connection.png';
import help from '../../images/help.png';

const Join = () => (
  <div className="Join">
    <h2>Join our community</h2>
    <p className="JoinText">
Join our
      <span className="ImportantWords"> friendly </span>
and
      <span className="ImportantWords"> lovely </span>
community! We are almost
      <span className="ImportantWords"> 150 </span>
contributors around the world.
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

import React, { Component } from 'react';
import './Join.scss';
import CountUp from 'react-countup';

import community from '../images/community.png';
import connection from '../images/connection.png';
import help from '../images/help.png';
import API_SERVER from '../constants';


class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: 0,
      allDownload: 0,
      allView: 0,
      projects: 0,
      oneTime: true,
    };
  }

  onScrollEvent() {
    const { oneTime } = this.state;
    if (oneTime) {
      fetch(`${API_SERVER}/community/`)
        .then(res => res.json())
        .then(data => this.setState({
          contributors: data.contributors,
          projects: data.projects,
          allDownload: data.allDownload,
          allView: data.allView,
          oneTime: false,
        }))
        .catch();
    }
  }

  render() {
    const {
      contributors, projects, allDownload, allView,
    } = this.state;
    return (
      <div className="Join" onMouseOver={() => this.onScrollEvent()}>
        <h2>Join our community</h2>
        <p className="JoinText">
          Join our
          <span className="ImportantWords"> friendly </span>
          community!
          We are currently
          {' '}
          <span className="ImportantNumber">
            <CountUp
              className="account-balance"
              start={0}
              end={contributors}
              delay={5}
              duration={2}
              useEasing
              useGrouping
              separator=" "
            />
          </span>
          <span className="ImportantWords"> contributors </span>
          around the world.
          <br />
          Currently there are
          {' '}
          <span className="ImportantNumber">
            <CountUp
              className="account-balance"
              start={0}
              end={projects}
              delay={5}
              duration={2}
              useEasing
              useGrouping
              separator=" "
            />
          </span>
          <span className="ImportantWords"> projects </span>
          created,
          {' '}
          <span className="ImportantNumber">
            <CountUp
              className="account-balance"
              start={0}
              end={allView}
              delay={5}
              duration={2}
              useEasing
              useGrouping
              separator=" "
            />
          </span>
          <span className="ImportantWords"> views </span>
          and
          {' '}
          <span className="ImportantNumber">
            <CountUp
              className="account-balance"
              start={0}
              end={allDownload}
              delay={5}
              duration={2}
              useEasing
              useGrouping
              separator=" "
            />
          </span>
          <span className="ImportantWords"> downloads </span>
          of layers made on our site.
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
  }
}

export default Join;

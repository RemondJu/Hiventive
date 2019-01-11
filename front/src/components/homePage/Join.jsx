import React, { Component } from 'react';
import './Join.scss';
import community from '../../images/community.png';
import connection from '../../images/connection.png';
import help from '../../images/help.png';
import API_SERVER from '../../constants';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: 0,
      allDownload: 0,
      allView: 0,
    };
  }

  componentDidMount() {
    fetch(`${API_SERVER}/community/`)
      .then(res => res.json())
      .then(data => this.setState({
        contributors: data.contributors,
        allDownload: data.allDownload,
        allView: data.allView,
      }))
      .catch();
  }

  render() {
    const { contributors, allDownload, allView } = this.state;
    return (
      <div className="Join">
        <h2>Join our community</h2>
        <p className="JoinText">
        Join our
          <span className="ImportantWords"> friendly </span>
        community!
        We are almost
          <span className="ImportantWords">{` ${contributors} ` }</span>
        contributors around the world.
          <br />
        Currently there are
          <span className="ImportantWords">{` ${allView} `}</span>
        Layers views and
          <span className="ImportantWords">{` ${allDownload} `}</span>
        downloads made on our site.

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

import React, { Component } from 'react';
import eye from '../../images/eye.png';
import dll from '../../images/dll.png';
import username from '../../images/user.png';
import calendar from '../../images/calendar.png';
import './CardBestLayer.scss';

class CardBestLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      nameLayer,
      download,
      view,
      date,
      user,
    } = this.props;
    return (
      <div className="CardBestLayer">
        <h3>
          Layer
          <span className="bestcardcontent">{nameLayer}</span>
        </h3>
        <span>
          <img src={dll} alt="dll" width="10%" />
          <span className="bestcardvalues">{download}</span>
        </span>
        <span>
          <img src={eye} alt="eye" width="10%" />
          <span className="bestcardvalues">{view}</span>
        </span>
        <br />
        <span>
          <img src={calendar} alt="calendar" width="10%" />
          <span className="bestcardvalues">{date}</span>
        </span>
        <br />
        <span>
          <img src={username} alt="user" width="10%" />
          <span className="bestcardvalues">
            {
             (user.length > 20)
               ? `${user.slice(0, 19)}...` : user
            }

          </span>
        </span>
      </div>

    );
  }
}
export default CardBestLayer;

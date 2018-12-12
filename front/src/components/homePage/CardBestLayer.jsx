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
      description,
      type,
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
        <p className="bestcardtitlesecond">
          Descriptions :
          <span className="bestcardcontent">{description}</span>
        </p>
        <p className="bestcardtitlesecond">
          Type :
          <span className="bestcardcontent">{type}</span>
        </p>
        <span>
          <img src={dll} alt="dll" width="5%" />
          <span className="bestcardvalues">{download}</span>
        </span>
        <span>
          <img src={eye} alt="eye" width="5%" />
          <span className="bestcardvalues">{view}</span>
        </span>
        <span>
          <img src={calendar} alt="calendar" width="5%" />
          <span className="bestcardvalues">{date}</span>
        </span>
        <span>
          <img src={username} alt="user" width="5%" />
          <span className="bestcardvalues">{user}</span>
        </span>
      </div>

    );
  }
}
export default CardBestLayer;

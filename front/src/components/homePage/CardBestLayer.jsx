import React, { Component } from 'react';
import eye from '../../images/eye.png';
import dll from '../../images/dll.png';
import username from '../../images/user.png';
import './CardBestLayer.scss';

class CardBestLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      nameLayer,
      download,
      view,
      user,
      rank,
    } = this.props;
    return (
      <div className="CardBestLayer">
        <div className="frontLayer">
          <h3>
            Layer
            <span className="bestcardcontentname">{nameLayer}</span>
          </h3>
          <span>
            <img src={dll} alt="dll" width="10%" />
            <span className="bestcardvaluesdowload">{download}</span>
          </span>
          <br />
          <span>
            <img src={eye} alt="eye" width="10%" />
            <span className="bestcardvaluesview">{view}</span>
          </span>
          <br />
          <span>
            <img src={username} alt="user" width="10%" />
            <span className="bestcardvaluesname">
              {
                (user.length > 20)
                  ? `${user.slice(0, 19)}...` : user
              }
            </span>
          </span>
        </div>
        <div className="backlayer">
          <div className="layerwatch">
            <h4>watch it!</h4>
          </div>
          <div className="layerang">
            <h5>
              N° :
              <span className="bestcardvaluesrank">{rank}</span>
            </h5>
          </div>

        </div>
      </div>
    );
  }
}
export default CardBestLayer;

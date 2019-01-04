import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './LoadingContent.scss';

class LoadingContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLoading } = this.props;
    const classDisplay = isLoading ? 'isTrue' : 'isFalse';
    return (
      <div className="LoadingContent">
        <div className={classDisplay}>
          <div className="loadingLogo" />
        </div>
      </div>
    );
  }
}

LoadingContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mstp = state => ({
  isLoading: state.isLoading,
});

export default connect(mstp)(LoadingContent);

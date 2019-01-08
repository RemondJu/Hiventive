import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { isLoading } from '../actions/fetch';


import './LoadingContent.scss';

class LoadingContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sendError = this.sendError.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.sendError();
    }, 15000);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.sendError();
    }, 15000);
  }

  sendError() {
    const { isLoadingValue, isLoadingRedux, history } = this.props;
    if (isLoadingValue) {
      isLoadingRedux(false);
    }
    history.push('/');
  }

  render() {
    const { isLoadingValue } = this.props;
    const classDisplayLoading = isLoadingValue ? 'isTrue' : 'isFalse';
    return (
      <div className="LoadingContent">
        <div className={classDisplayLoading}>
          <div className="container">
            <div className="dash uno" />
            <div className="dash dos" />
            <div className="dash tres" />
            <div className="dash cuatro" />
          </div>
        </div>
      </div>
    );
  }
}

LoadingContent.propTypes = {
  isLoadingValue: PropTypes.bool.isRequired,
  isLoadingRedux: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};

const mstp = state => ({
  isLoadingValue: state.isLoading,
});

const mdtp = dispatch => bindActionCreators({
  isLoadingRedux: isLoading,
}, dispatch);

export default withRouter(connect(mstp, mdtp)(LoadingContent));

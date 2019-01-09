import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchCategoriesLayer } from '../actions/fetch';
import { showToggleAdd, newLayerModal } from '../actions';
import API_SERVER from '../constants';


import './AddLayer.scss';

class AddLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      version: '',
      url: '',
      hostSite: '',
      description: '',
      layerTypeID: '',
      share: false,
    };
    this.inputChange = this.inputChange.bind(this);
    this.inputChangeCheckbox = this.inputChangeCheckbox.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }


  componentDidMount() {
    const { fetchCategoriesLayerRedux } = this.props;
    fetchCategoriesLayerRedux();
  }

  inputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  inputChangeCheckbox() {
    this.setState(prevState => ({
      share: !prevState.share,
    }));
  }

  sendForm(event) {
    event.preventDefault();
    const {
      name,
      version,
      url,
      hostSite,
      description,
      layerTypeID,
      share,
    } = this.state;

    const { history, newLayerModalRedux, userIsLogin } = this.props;
    
    // id userId
    const layerSend = {
      userId: userIsLogin.id,
      viewsCounter: 0,
      downloadsCounter: 0,
      imported: false,
      layerTypeID: Number(layerTypeID),
      description: description === '' ? 'no description' : description,
      name,
      version,
      url,
      hostSite,
      share,
    };
    
    // id project temp
    const projectId = 1;
    if (layerTypeID !== 0) {
      const conf = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(layerSend),
      };
      fetch(`${API_SERVER}/layer/?projectId=${projectId}`, conf)
        .then(() => history.push('/'))
        .catch();
    }
    newLayerModalRedux();
  }

  render() {
    const {
      name,
      version,
      url,
      hostSite,
      description,
      share,
    } = this.state;

    const {
      categoryLayer,
      modalLayer,
      newLayerModalRedux,
    } = this.props;

    return (
      <div className={`modal_add_layer ${modalLayer}`}>
        <div className="content_modal_add_layer">
          <button className="close" type="button" onClick={newLayerModalRedux}>&times;</button>
          <h2 className="modal_title">ADD A NEW LAYER</h2>
          <form onSubmit={this.sendForm}>
            <ul className="modal_form">
              <li>
                <label className="label_input" htmlFor="name">
                  Name
                  <input className="login_input" required name="name" id="name" onChange={this.inputChange} value={name} type="text" />
                </label>
                <label className="label_input" htmlFor="url">
                  Url
                  <input className="login_input" required name="url" id="url" onChange={this.inputChange} value={url} type="text" />
                </label>
              </li>

              <li>
                <label className="label_input" htmlFor="version">
                  Version
                  <input className="login_input" required name="version" id="version" onChange={this.inputChange} value={version} type="text" />
                </label>
                <label className="label_input" htmlFor="hostSite">
                  Host site
                  <input className="login_input" required name="hostSite" id="hostSite" onChange={this.inputChange} value={hostSite} type="text" />
                </label>
              </li>

              <li>
              Category
                <div>
                  <select name="layerTypeID" id="layerTypeID" onChange={this.inputChange}>
                    <option value={0}>Select type</option>
                    {categoryLayer.length === 0 ? '...' : categoryLayer.categories.map(category => <option key={category.id} value={category.id}>{category.type}</option>)}
                  </select>
                </div>
              </li>

              <li>
                <label className="label_input" htmlFor="description">
                  <p>Description</p>
                  <textarea className="text_area_input" name="description" id="description" onChange={this.inputChange} value={description} />
                </label>
              </li>

              <li>
                <button className="button_submit" type="submit">
                  Submit
                </button>
                <label className="label_input" htmlFor="share">
                  <input className="login_input" name="share" id="share" onChange={this.inputChangeCheckbox} value={share} type="checkbox" />
                  Share your layer
                </label>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

AddLayer.propTypes = {
  fetchCategoriesLayerRedux: PropTypes.func.isRequired,
  categoryLayer: PropTypes.shape.isRequired,
  newLayerModalRedux: PropTypes.func.isRequired,
  userIsLogin: PropTypes.shape.isRequired,

};

const mstp = state => ({
  categoryLayer: state.categoryLayer,
  modalLayer: state.newLayerModalToggle,
  userIsLogin: state.userIsLogin,
});

const mdtp = dispatch => bindActionCreators({
  fetchCategoriesLayerRedux: fetchCategoriesLayer,
  showToggleAddRedux: showToggleAdd,
  newLayerModalRedux: newLayerModal,
}, dispatch);


export default withRouter(connect(mstp, mdtp)(AddLayer));

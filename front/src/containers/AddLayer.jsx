import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import { fetchCategoriesLayer } from '../actions/fetch';
import API_SERVER from '../constants';


import './AddLayer.scss';

class AddLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      version: 0,
      url: '',
      hostSite: '',
      description: '',
      categories: '',
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
      share: prevState.share,
    }));
  }

  sendForm(event) {
    const data = this.state;
    const { history } = this.props;
    event.preventDefault();
    const conf = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(`${API_SERVER}/layer`, conf)
      .then(() => history.push('/'))
      .catch();
  }

  render() {
    const {
      name,
      version,
      url,
      hostSite,
      description,
      categories,
      share,
    } = this.state;
    const { categoryLayer } = this.props;
    return (
      <div className="AddLayer">
        <SideBar />
        <div className="content_add_layer">
          <Row>
            <h2 className="text_title">
              Make new layer
            </h2>
          </Row>
          <form onSubmit={this.sendForm}>
            <Row>
              <Col sm="6">
                <ul className="liste_input">
                  <li className="item_input">
                    <label className="label_input" htmlFor="name">
                      <p>Name</p>
                      <input name="name" id="name" onChange={this.inputChange} value={name} type="text" />
                    </label>
                  </li>
                  <li className="item_input">
                    <label className="label_input" htmlFor="url">
                      <p>Url</p>
                      <input name="url" id="url" onChange={this.inputChange} value={url} type="text" />
                    </label>
                  </li>
                  <li className="item_input">
                    <p>Category</p>
                    <select name="categories" id="categories" value={categories} onChange={this.inputChange}>
                      {categoryLayer.length === 0 ? '...' : categoryLayer.map(category => <option key={category.id} value={category}>{category}</option>)}
                    </select>
                  </li>
                </ul>
              </Col>
              <Col sm="6">
                <ul className="liste_input">
                  <li className="item_input">
                    <label className="label_input" htmlFor="version">
                      <p>Version</p>
                      <input name="version" id="version" onChange={this.inputChange} value={version} type="text" />
                    </label>
                  </li>
                  <li className="item_input">
                    <label className="label_input" htmlFor="hostSite">
                      <p>Host site</p>
                      <input name="hostSite" id="hostSite" onChange={this.inputChange} value={hostSite} type="text" />
                    </label>
                  </li>
                  <li className="item_input">
                    <label className="label_chekbox" htmlFor="share">
                      <p>Share</p>
                      <input name="share" id="share" onChange={this.inputChange} value={share} type="checkbox" />
                    </label>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="text_area">
                <label className="label_input" htmlFor="description">
                  <p>Description</p>
                  <textarea className="text_area_input" name="description" id="description" onChange={this.inputChange} value={description} />
                </label>
              </Col>
            </Row>
            <Row>
              <Col xs="6" className="text_align_center">
                <NavLink to="/LayerInfos">
                  <button className="button_submit" type="button">
                    return
                  </button>
                </NavLink>
              </Col>
              <Col xs="6" className="text_align_center">
                <button className="button_submit" type="submit">
                  Submit
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}

AddLayer.propTypes = {
  fetchCategoriesLayerRedux: PropTypes.func.isRequired,
  categoryLayer: PropTypes.shape.isRequired,
};

const mstp = state => ({
  categoryLayer: state.categoryLayer,
});

const mdtp = dispatch => bindActionCreators({
  fetchCategoriesLayerRedux: fetchCategoriesLayer,
}, dispatch);


export default connect(mstp, mdtp)(AddLayer);

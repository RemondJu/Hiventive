import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Col, Row, Button, Form, FormGroup, Label, Input, Alert,
} from 'reactstrap';

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
      share: true,
      boolSendLayer: false,
      colorAlert: '',
      textAlert: '',
    };
    this.inputChange = this.inputChange.bind(this);
    this.inputChangeCheckbox = this.inputChangeCheckbox.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.sendAlert = this.sendAlert.bind(this);
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
    const { share } = this.state;
    this.setState({
      share: !share,
    });
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
      version: version === '' ? '0.0.1' : version,
      name,
      url,
      hostSite,
      share,
    };

    if (layerTypeID !== 0 && name !== '' && url !== '' && hostSite !== '') {
      const conf = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(layerSend),
      };
      fetch(`${API_SERVER}/layer/`, conf)
        .then(() => this.setState({
          name: '',
          version: '',
          url: '',
          hostSite: '',
          description: '',
          layerTypeID: '',
          share: true,
        }))
        .then(() => newLayerModalRedux())
        .then(() => history.push('/ToolPage'))
        .catch(() => this.sendAlert('danger', 'Sorry your layer is not send'));
    } else {
      this.sendAlert('warning', 'Your form is empty !');
    }
  }

  sendAlert(color, text) {
    setTimeout(() => this.setState({ boolSendLayer: false }), 5000);
    this.setState(prevState => ({
      boolSendLayer: !prevState.boolSendLayer,
      colorAlert: color,
      textAlert: text,
    }));
  }

  render() {
    const {
      name,
      version,
      url,
      hostSite,
      description,
      share,
      boolSendLayer,
      colorAlert,
      textAlert,
    } = this.state;

    const {
      categoryLayer,
      modalLayer,
      newLayerModalRedux,
    } = this.props;

    return (
      <div className={`modal_add_layer ${modalLayer}`}>
        {!boolSendLayer ? '' : (
          <Alert color={colorAlert} className="alert_text">
            {textAlert}
          </Alert>
        )}

        <div className="content_modal_add_layer">
          <button className="close" type="button" onClick={newLayerModalRedux}>&times;</button>
          <h2 className="modal_title">ADD A NEW LAYER</h2>
          <Form className="modal_form" noValidate onSubmit={this.sendForm}>
            <Row form>
              <Col className="form-style" md={6}>
                <FormGroup>
                  <Label htmlFor="name">Layer title</Label>
                  <Input className="input-style" required name="name" id="name" onChange={this.inputChange} value={name} type="text" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="form-style">
                  <Label htmlFor="url">Layer URL</Label>
                  <Input required name="url" id="url" onChange={this.inputChange} value={url} type="text" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label htmlFor="hostSite">Host site</Label>
                  <Input required name="hostSite" id="hostSite" onChange={this.inputChange} value={hostSite} type="text" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="version">Version</Label>
                  <Input required name="version" id="version" onChange={this.inputChange} value={version} type="text" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label htmlFor="layerTypeID">Select type</Label>
                  <Input className="option-style" type="select" name="layerTypeID" id="layerTypeID" onChange={this.inputChange}>
                    <option value={0}>None</option>
                    {categoryLayer.length === 0 ? '...' : categoryLayer.map(category => <option key={category.id} value={category.id}>{category.type}</option>)}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="description">Description</Label>
                  <Input name="description" id="description" onChange={this.inputChange} value={description} style={{ height: 70 }} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup check>
                  <Label name="share" id="share" value={share}>
                    <Input type="checkbox" onChange={this.inputChangeCheckbox} checked={share} />
                    Make my layer public
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button>Add Layer</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

AddLayer.propTypes = {
  fetchCategoriesLayerRedux: PropTypes.func.isRequired,
  categoryLayer: PropTypes.arrayOf(PropTypes.shape).isRequired,
  newLayerModalRedux: PropTypes.func.isRequired,
  userIsLogin: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
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

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './NavBar.scss';
import '../components/ModalLogin.scss';
import {
  showToggleAdd,
  showToggleLog,
  switchLoginModal,
  filterType,
  newLayerModal,
  hidAllModalNavBar,

} from '../actions';
import { fetchSearchLayer } from '../actions/fetch';
import ModalLogin from '../components/ModalLogin';
import logoHiventiveWhite from '../images/logoHiventive_white.png';
import AddLayer from './AddLayer';
import NewProjectModal from './NewProjectModal';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordSearch: '',
    };
    this.searchChange = this.searchChange.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
    this.goToListProject = this.goToListProject.bind(this);
  }

  searchChange(event) {
    this.setState({
      wordSearch: event.target.value,
    });
  }

  sendSearch(event) {
    const { wordSearch } = this.state;
    const { fetchSearchLayerRedux, history, filterTypeRedux } = this.props;
    event.preventDefault();
    fetchSearchLayerRedux(wordSearch);
    filterTypeRedux('All');
    history.push('/ToolPage');
  }

  goToListProject() {
    const { history, hidAllModalNavBarRedux } = this.props;
    hidAllModalNavBarRedux();
    history.push('/list-projects');
  }

  render() {
    const {
      switchLoginModalRedux,
      switchAddLayerModalRedux,
      showToggleAddRedux,
      showToggleLogRedux,
      popoversNavbar,
    } = this.props;
    const { wordSearch } = this.state;
    return (
      <div className="NavBar">
        <NavLink to="/" className="logo">
          <img className="logo" alt="logo_hiventive" src={logoHiventiveWhite} />
          <h1 className="title">Hiventive</h1>
        </NavLink>
        <div className="searchbar">
          <form onSubmit={this.sendSearch}>
            <input className="field" value={wordSearch} onChange={this.searchChange} placeholder="Search for layers" type="text" />
            <button className="button_search" type="submit">Search</button>
          </form>
        </div>

        <div className="buttonsForPopovers">

          <button className="button_add" onClick={() => showToggleAddRedux()} type="button">Add</button>
          <div className={popoversNavbar.toggleAdd ? 'popoversShow effectAdd' : 'popoversHid'}>
            <div className={popoversNavbar.toggleAdd ? 'textShow' : 'textHidden'}>
              {/* <NavLink className="button_link_log" to="/newLayer/">Add new Layer</NavLink> */}
              <button className="button_link_log" type="button" onClick={() => switchAddLayerModalRedux()}>Add new Layer</button>
            </div>
          </div>

          <button className="button_login" onClick={() => showToggleLogRedux()} type="button">Login / Sign in</button>
          <div className={popoversNavbar.toggleLog ? 'popoversShow effectLog' : 'popoversHid'}>
            <div className={popoversNavbar.toggleLog ? 'textShow' : 'textHidden'}>
              <button className="button_link_log" type="button" onClick={() => switchLoginModalRedux()}>login</button>
              <button className="button_link_log" type="button" onClick={() => this.goToListProject()}>Your projects</button>
            </div>
          </div>
        </div>
        <ModalLogin />
        <NewProjectModal />
        <AddLayer />
      </div>
    );
  }
}

NavBar.propTypes = {
  switchAddLayerModalRedux: PropTypes.func.isRequired,
  switchLoginModalRedux: PropTypes.func.isRequired,
  showToggleAddRedux: PropTypes.func.isRequired,
  showToggleLogRedux: PropTypes.func.isRequired,
  popoversNavbar: PropTypes.shape.isRequired,
  fetchSearchLayerRedux: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  filterTypeRedux: PropTypes.func.isRequired,
};

const mstp = state => ({
  popoversNavbar: state.popoversNavbar,
});

const mdtp = dispatch => bindActionCreators({
  switchLoginModalRedux: switchLoginModal,
  switchAddLayerModalRedux: newLayerModal,
  showToggleAddRedux: showToggleAdd,
  showToggleLogRedux: showToggleLog,
  fetchSearchLayerRedux: fetchSearchLayer,
  filterTypeRedux: filterType,
  hidAllModalNavBarRedux: hidAllModalNavBar,
}, dispatch);

export default withRouter(connect(mstp, mdtp)(NavBar));

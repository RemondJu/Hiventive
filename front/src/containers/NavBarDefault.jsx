import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Input,
} from 'reactstrap';
import {
  filterType,
  newLayerModal,
  newProjectModal,
  switchLoginModal,
  getWordFilter,
  enableRefresh,
} from '../actions';
import logoHiventiveWhite from '../images/logoHiventive_white.png';
import burgerMenu from '../images/burgerMenu.png';
import './NavBarDefault.scss';

class NavBarDefault extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      wordSearch: '',
      collapsed: true,
      wordButton: 'Go to catalog',
    };
    this.searchChange = this.searchChange.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }

  searchChange(event) {
    this.setState({
      wordSearch: event.target.value,
    });
  }

  sendSearch(event) {
    const { wordSearch } = this.state;
    const {
      enableRefreshAction,
      getWordFilterAction,
      history,
      filterTypeRedux,
    } = this.props;
    event.preventDefault();
    filterTypeRedux('All');
    enableRefreshAction();
    getWordFilterAction(wordSearch);
    this.setState({
      wordSearch: '',
    });
    history.push('/ToolPage');
  }

  toggleNavbar() {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  }

  render() {
    const {
      switchLoginModalRedux,
      switchAddLayerModalRedux,
      newProjectModalAction,
    } = this.props;
    const { collapsed, wordSearch, wordButton } = this.state;
    return (
      <div className="NavBarTest">
        <Navbar className="navbarcolor navbar-fixed-top" expand="md">
          <NavLink to="/" className="navbar-brand d-inline align-center">
            <div className="logoalign">
              <img className="d-inline-block align-center" alt="Hiventive" src={logoHiventiveWhite} width="40vw" height="40vw" />
              <h2 className="positiontitre">Hiventive</h2>
            </div>
          </NavLink>
          <NavbarToggler onClick={this.toggleNavbar}>
            <img className="d-inline-block align-top" alt="burger" src={burgerMenu} width="45vw" />
          </NavbarToggler>
          <Collapse isOpen={!collapsed} navbar>
            <FormGroup className="positionsearch form-inline m-auto">
              <form onSubmit={this.sendSearch} className="searchalign">
                <Input
                  className="form-control mr-sm-2 w-100"
                  value={wordSearch}
                  onChange={this.searchChange}
                  placeholder="Search for layers"
                  type="search"
                  name="search"
                  id="exampleSearch"
                  size="90"
                  onFocus={() => this.setState({ wordButton: 'Search' })}
                  onBlur={() => this.setState({ wordButton: 'Go to catalog' })}
                />
                <button className="btn btn-outline-light my-1 my-sm-1" type="submit">{wordButton}</button>
              </form>
            </FormGroup>
            <Nav className="ml-auto colorhover" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav className="titlemenu">
                  ADD
                </DropdownToggle>
                <DropdownMenu right>
                  <div className="displaymenu">
                    <button className="buttonlink" type="button" onClick={() => switchAddLayerModalRedux()}>New Layer</button>
                    <button className="buttonlink" type="button" onClick={() => newProjectModalAction()}>New project</button>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav className="titlemenu">
                  LOGIN
                </DropdownToggle>
                <DropdownMenu right>
                  <div className="displaymenu">
                    <button className="buttonlink" type="button" onClick={() => switchLoginModalRedux()}>Profile</button>
                    <NavLink to="/project-page">
                      <button className="buttonlink" type="button">Projects</button>
                    </NavLink>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mstp = state => ({
  popoversNavbar: state.popoversNavbar,
});

const mdtp = dispatch => bindActionCreators({
  switchLoginModalRedux: switchLoginModal,
  newProjectModalAction: newProjectModal,
  switchAddLayerModalRedux: newLayerModal,
  filterTypeRedux: filterType,
  getWordFilterAction: getWordFilter,
  enableRefreshAction: enableRefresh,
}, dispatch);

export default withRouter(connect(mstp, mdtp)(NavBarDefault));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchProjectUser } from '../actions/fetch';
import ProjectDisplay from './ProjectDisplay';
import './ListProjects.scss';
import SideBarDefault from '../components/toolPage/SideBarDefault';

class ListProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchProjectUserRedux, userIsLogin } = this.props;
    fetchProjectUserRedux(userIsLogin.id);
  }

  render() {
    const { projectUser } = this.props;
    return (
      <div className="ListProjects">
        <SideBarDefault />
        <div className="content_page">
          <h1 className="title_all_projects">All projects</h1>
          {projectUser.map(project => (
            <div className="list_projects">
              <ProjectDisplay
                name={project.name}
                description={project.description}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ListProjects.propTypes = {
  userIsLogin: PropTypes.shape.isRequired,
  projectUser: PropTypes.shape.isRequired,
  fetchProjectUserRedux: PropTypes.func.isRequired,
};

const mstp = state => ({
  userIsLogin: state.userIsLogin,
  projectUser: state.projectUser,
});

const mdtp = dispatch => bindActionCreators({
  fetchProjectUserRedux: fetchProjectUser,
}, dispatch);

export default connect(mstp, mdtp)(ListProjects);

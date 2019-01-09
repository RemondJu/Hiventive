import { combineReducers } from 'redux';
import modal from './modal';
import newProjectModalToggle from './newProjectModalToggle';
import { layersHasErrored, layersIsLoading, layersFetchDataSuccess } from './fetch';
import popoversNavbar from './popoversNavbar';
import categoryLayer from './categoryLayer';
import isLoading from './isLoading';
import typeFilter from './typeFilter';
import isError from './isError';
import userIsLogin from './userIsLogin';
import projectUser from './projectUser';

const allReducers = combineReducers({
  modal,
  popoversNavbar,
  categoryLayer,
  isLoading,
  newProjectModalToggle,
  layersHasErrored,
  layersIsLoading,
  layersFetchDataSuccess,
  typeFilter,
  isError,
  userIsLogin,
  projectUser,
});

export default allReducers;

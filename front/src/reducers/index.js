import { combineReducers } from 'redux';
import modal from './modal';
import newProjectModalToggle from './newProjectModalToggle';
import newLayerModalToggle from './newLayerModalToggle';
import { layersHasErrored, layersIsLoading, layersFetchDataSuccess } from './fetch';
import popoversNavbar from './popoversNavbar';
import categoryLayer from './categoryLayer';
import isLoading from './isLoading';
import typeFilter from './typeFilter';
import isError from './isError';
import layer from './layer';
import userIsLogin from './userIsLogin';
import projectUser from './projectUser';
import activeProjectId from './activeProjectId';
import projectLayers from './projectLayers';

const allReducers = combineReducers({
  modal,
  popoversNavbar,
  categoryLayer,
  isLoading,
  newProjectModalToggle,
  newLayerModalToggle,
  layersHasErrored,
  layersIsLoading,
  layersFetchDataSuccess,
  typeFilter,
  isError,
  layer,
  userIsLogin,
  projectUser,
  activeProjectId,
  projectLayers,
});

export default allReducers;

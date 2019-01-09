import { combineReducers } from 'redux';
import modal from './modal';
import newProjectModalToggle from './newProjectModalToggle';
import { layersHasErrored, layersIsLoading, layersFetchDataSuccess } from './fetch';
import popoversNavbar from './popoversNavbar';
import categoryLayer from './categoryLayer';
import isLoading from './isLoading';
import typeFilter from './typeFilter';
import isError from './isError';
import layer from './layer';

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
  layer,
});

export default allReducers;

import { combineReducers } from 'redux';
import modal from './modal';
import { layersHasErrored, layersIsLoading, layersFetchDataSuccess } from './fetch';
import popoversNavbar from './popoversNavbar';
import categoryLayer from './categoryLayer';
import isLoading from './isLoading';

const allReducers = combineReducers({
  modal,
  popoversNavbar,
  categoryLayer,
  isLoading,
  layersHasErrored,
  layersIsLoading,
  layersFetchDataSuccess,
});

export default allReducers;

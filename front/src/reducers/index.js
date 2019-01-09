import { combineReducers } from 'redux';
import modal from './modal';
import newProjectModalToggle from './newProjectModalToggle';
import newLayerModalToggle from './newLayerModalToggle';
import { layersHasErrored, layersIsLoading, layersFetchDataSuccess } from './fetch';
import popoversNavbar from './popoversNavbar';
import categoryLayer from './categoryLayer';
import isLoading from './isLoading';
import typeFilter from './typeFilter';


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
});

export default allReducers;

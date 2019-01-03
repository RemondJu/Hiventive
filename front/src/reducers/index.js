import { combineReducers } from 'redux';
import modal from './modal';
import { layersHasErrored, layersIsLoading, layersFetchDataSuccess } from './fetch';

const allReducers = combineReducers({
  modal,
  layersHasErrored,
  layersIsLoading,
  layersFetchDataSuccess,
});

export default allReducers;

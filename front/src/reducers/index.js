import { combineReducers } from 'redux';
import modal from './modal';
import popoversNavbar from './popoversNavbar';
import categoryLayer from './categoryLayer';
import isLoading from './isLoading';

const allReducers = combineReducers({
  modal,
  popoversNavbar,
  categoryLayer,
  isLoading,
});

export default allReducers;

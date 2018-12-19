import { combineReducers } from 'redux';
import modal from './modal';
import popoversNavbar from './popoversNavbar';
import categoryLayer from './categoryLayer';

const allReducers = combineReducers({
  modal,
  popoversNavbar,
  categoryLayer,
});

export default allReducers;

import { combineReducers } from 'redux';
import modal from './modal';
import popoversNavbar from './popoversNavbar';

const allReducers = combineReducers({
  modal,
  popoversNavbar,
});

export default allReducers;

const initialState = {
  toggleAdd: false,
  toggleLog: false,
};

const popoversNavbar = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_LOGIN_MODAL':
      return { ...state, toggleAdd: false, toggleLog: false };

    case 'SHOW_TOGGLE_ADD':
      return { ...state, toggleAdd: !state.toggleAdd, toggleLog: false };

    case 'SHOW_TOGGLE_LOG':
      return { ...state, toggleLog: !state.toggleLog, toggleAdd: false };

    case 'SWITCH_LOGIN_MODAL_HID':
      return { ...state, toggleAdd: false, toggleLog: false };


    default: return state;
  }
};

export default popoversNavbar;

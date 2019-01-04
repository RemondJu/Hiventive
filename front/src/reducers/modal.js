const initialState = 'hidden';

const modal = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_LOGIN_MODAL': return state ? '' : 'hidden';
    default: return state;
  }
};

export default modal;

const initialState = 'hidden';

const newlayerModalToggle = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_LAYER_MODAL': return state ? '' : 'hidden';
    default: return state;
  }
};

export default newlayerModalToggle;

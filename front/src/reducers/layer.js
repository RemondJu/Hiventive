const initialState = {};

const layer = (state = initialState, action) => {
  switch (action.type) {
    case 'LAYER_FETCH_DATA_SUCCESS':
      return action.layer;
    default:
      return state;
  }
};

export default layer;

const initialState = {};

const projectLayers = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVE_PROJECT_LAYERS_FETCH_SUCCESS':
      return action.projectLayers;
    default:
      return state;
  }
};

export default projectLayers;

const initialState = [];

const categoryLayer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_LAYER_FETCH_DATA_SUCCESS':
      return { ...state, categories: action.categories };

    default: return state;
  }
};

export default categoryLayer;

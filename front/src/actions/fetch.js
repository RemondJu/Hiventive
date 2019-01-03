import API_SERVER from '../constants';

// fetch categories to layer
export const hasErrored = bool => ({
  type: 'HAS_ERRORED',
  hasErrored: bool,
});

export const isLoading = bool => ({
  type: 'IS_LOADING',
  isLoading: bool,
});

export function layersFetchDataSuccess(layers) {
  return {
    type: 'LAYERS_FETCH_DATA_SUCCESS',
    layers,
  };
}

export const layersFetchData = url => (dispatch) => {
  dispatch(isLoading(true));
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      return response;
    })
    .then(response => response.json())
    .then(layers => dispatch(layersFetchDataSuccess(layers)))
    .catch(() => dispatch(hasErrored(true)));
};

export const categoriesLayerFetchDataSuccess = categories => ({
  type: 'CATEGORIES_LAYER_FETCH_DATA_SUCCESS',
  categories,
});

export const fetchCategoriesLayer = () => (dispatch) => {
  dispatch(isLoading(true));
  fetch(`${API_SERVER}/layer/categories/`)
    .then(res => res.json())
    .then(categories => dispatch(categoriesLayerFetchDataSuccess(categories)))
    .then(() => dispatch(isLoading(false)))
    .catch(() => dispatch(hasErrored(true)));
};

export const searchLayerFetchDataSuccess = layers => ({
  type: 'SEARCH_LAYER_FETCH_DATA_SUCCESS',
  layers,
});

export const fetchSearchLayer = wordSearch => (dispatch) => {
  dispatch(isLoading(true));
  fetch(`${API_SERVER}/layer/search/?wordSearch=${wordSearch}`)
    .then(res => res.json())
    .then(layers => dispatch(searchLayerFetchDataSuccess(layers)))
    .then(() => dispatch(isLoading(false)))
    .catch(() => dispatch(hasErrored(true)));
};

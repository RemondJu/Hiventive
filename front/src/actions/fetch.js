import API_SERVER from '../constants';

// fetch categories to layer
export const categoriesLayerHasErrored = bool => ({
  type: 'CATEGORIES_LAYER_HAS_ERRORED',
  hasErrored: bool,
});

export const categoriesLayerIsLoading = bool => ({
  type: 'CATEGORIES_LAYER_IS_LOADING',
  isLoading: bool,
});

export const categoriesLayerFetchDataSuccess = categories => ({
  type: 'CATEGORIES_LAYER_FETCH_DATA_SUCCESS',
  categories,
});

export const fetchCategoriesLayer = () => (dispatch) => {
  dispatch(categoriesLayerIsLoading(true));
  fetch(`${API_SERVER}/layer/categories/`)
    .then(res => res.json())
    .then(categories => dispatch(categoriesLayerFetchDataSuccess(categories)))
    .then(() => dispatch(categoriesLayerIsLoading(false)))
    .catch(() => dispatch(categoriesLayerHasErrored(true)));
};

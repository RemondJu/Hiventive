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

import API_SERVER from '../constants';

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
  fetch(`${API_SERVER}/layer/categories/`)
    .then(res => res.json())
    .then(categories => dispatch(categoriesLayerFetchDataSuccess(categories)))
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

export const getProjectsToUser = projects => ({
  type: 'PROJECTS_USER_FETCH_DATA_SUCCESS',
  projects,
});

export const fetchProjectUser = idUser => (dispatch) => {
  fetch(`${API_SERVER}/projects/user/${idUser}`)
    .then(res => res.json())
    .then(projects => dispatch(getProjectsToUser(projects)))
    .catch(() => dispatch(hasErrored(true)));
};

export const layerFetchDataSuccess = layer => ({
  type: 'LAYER_FETCH_DATA_SUCCESS',
  layer,
});

export const fetchLayerInfos = id => (dispatch) => {
  fetch(`${API_SERVER}/layerdetail/${parseInt((id), 10)}`)
    .then(res => res.json())
    .then(layer => dispatch(layerFetchDataSuccess(layer)))
    .catch(() => dispatch(hasErrored(true)));
};

export const activeProjectLayersFetchSuccess = projectLayers => ({
  type: 'ACTIVE_PROJECT_LAYERS_FETCH_SUCCESS',
  projectLayers,
});

export const fetchLayersFromActiveProject = id => (dispatch) => {
  fetch(`${API_SERVER}/layers-from-project/${id}`)
    .then(res => res.json())
    .then(layers => dispatch(activeProjectLayersFetchSuccess(layers)))
    .catch(() => dispatch(hasErrored(true)));
};

export const logSendId = idNameReceive => ({
  type: 'LOG_ID_NAME',
  idNameReceive,
});

// fetch log
export const fetchLogUser = login => (dispatch) => {
  fetch(`${API_SERVER}/login/?firstname=${login.firstname}&password=${login.password}`)
    .then(res => res.json())
    .then(data => dispatch(logSendId(data)))
    .catch(() => dispatch(hasErrored(true)));
};

export function layersHasErrored(bool) {
  return {
    type: 'LAYERS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function layersIsLoading(bool) {
  return {
    type: 'LAYERS_IS_LOADING',
    isLoading: bool,
  };
}
export function layersFetchDataSuccess(layers) {
  return {
    type: 'LAYERS_FETCH_DATA_SUCCESS',
    layers,
  };
}


export const layersFetchData = url => (dispatch) => {
  dispatch(layersIsLoading(true));
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(layersIsLoading(false));
      return response;
    })
    .then(response => response.json())
    .then(layers => dispatch(layersFetchDataSuccess(layers)))
    .catch(() => dispatch(layersHasErrored(true)));
};

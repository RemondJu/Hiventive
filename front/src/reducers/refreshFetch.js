const refreshFetch = (state = false, action) => {
  switch (action.type) {
    case 'PROJECTS_USER_FETCH_DATA_SUCCESS':
      return false;
    case 'ENABLE_REFRESH':
      return true;
    default:
      return state;
  }
};

export default refreshFetch;

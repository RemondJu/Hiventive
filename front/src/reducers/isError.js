const isError = (state = false, action) => {
  switch (action.type) {
    case 'HAS_ERRORED':
      return state;

    default:
      return state;
  }
};

export default isError;

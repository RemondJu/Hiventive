const initialState = [];

const projectUser = (state = initialState, action) => {
  switch (action.type) {
    case 'PROJECTS_USER_FETCH_DATA_SUCCESS':
      return action.projects;

    default:
      return state;
  }
};

export default projectUser;

const initialState = '';

const activeProjectName = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_ACTIVE_PROJECT_NAME': return action.projectName;
    default: return state;
  }
};

export default activeProjectName;

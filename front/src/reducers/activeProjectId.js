const initialState = 0;

const activeProjectId = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_ACTIVE_PROJECT': return action.projectId;
    case 'RESET_ACTIVE_PROJECT': return 0;
    default: return state;
  }
};

export default activeProjectId;

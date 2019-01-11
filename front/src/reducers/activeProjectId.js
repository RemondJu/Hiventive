const initialState = 8;

const activeProjectId = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_ACTIVE_PROJECT': return action.projectId;
    default: return state;
  }
};

export default activeProjectId;

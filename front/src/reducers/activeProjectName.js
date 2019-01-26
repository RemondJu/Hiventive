const initialState = '';

const activeProjectName = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROJECT_NAME': return action.name;
    default: return state;
  }
};

export default activeProjectName;

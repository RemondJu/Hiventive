const initialState = 'hidden';

const newProjectModalToggle = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_PROJECT_MODAL': return state ? '' : 'hidden';
    default: return state;
  }
};

export default newProjectModalToggle;

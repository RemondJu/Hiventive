const initialState = 'All';

const typeFilter = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_TYPE': return action.typeFilter;
    default: return state;
  }
};

export default typeFilter;

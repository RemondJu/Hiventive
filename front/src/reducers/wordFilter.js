const initialState = '';

const wordFilter = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_WORD_FILTER': return action.word;
    default: return state;
  }
};

export default wordFilter;

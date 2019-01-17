const initialState = {
  id: 1,
};

const userIsLogin = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_ID_NAME':
      return action.idNameReceive;

    default:
      return state;
  }
};

export default userIsLogin;

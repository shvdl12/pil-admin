export const LOGIN = "AUTH/LOGIN";
export const LOGOUT = "AUTH/LOGOUT";

export const login = user => ({ type: LOGIN, payload: user });
export const logout = user => ({ type: LOGOUT, payload: user });

const initalState = {
  user: {
    id: '',
    token: '',
    grade: ''
  }
};

const userChecker = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN:
          return {
            ...state,
            user : {
              ...state.user,
              token : action.payload.token,
              id: action.payload.id,
              grade : action.payload.grade,
            }
          };
        case LOGOUT:
          return {
              ...state,
              user : {
                token : '',
                id: '',
                grade : '',
              }
          };
        default:
          return state;
    }
};

export default userChecker
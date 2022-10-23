export const LOGIN = "AUTH/LOGIN";
export const LOGOUT = "AUTH/LOGOUT";

export const login = user => ({ type: LOGIN, payload: user });
export const logout = user => ({ type: LOGOUT, payload: user });

const initalState = {
  user: {
    token: '',
    isAdmin: false
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
              isAdmin : action.payload.isAdmin,
            }
          };
        case LOGOUT:
          return {
              ...state,
              user : {
                token: '',
                isAdmin: false,  
              }
          };
        default:
          return state;
    }
};

export default userChecker
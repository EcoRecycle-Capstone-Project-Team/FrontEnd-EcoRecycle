import { registerUser, loginUser, getOwnProfile } from "../utils/api";

export const registerUserAsync = ({ username, email, password }) => {
  return async (dispatch) => {
    dispatch(registerUserStart());
    try {
      const response = await registerUser(username, email, password);
      dispatch(registerUserSuccess(response.data));
      localStorage.setItem("token", response.data.token);
      await dispatch(loginUserAsync({ email, password }));
    } catch (error) {
      dispatch(registerUserFailure(error.message));
    }
  };
};

export const loginUserAsync = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(loginUserStart());
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      dispatch(loginUserSuccess(response.data));
    } catch (error) {
      dispatch(loginUserFailure(error.message));
    }
  };
};

export const getOwnProfileAsync = (token) => {
  return async (dispatch) => {
    try {
      const response = await getOwnProfile(token);
      const userData = response.data.user;
      dispatch(getOwnProfileSuccess(userData));
    } catch (error) {
      dispatch(getOwnProfileFailure(error.message));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};

export const REGISTER_USER_START = "auth/registerUserStart";
export const REGISTER_USER_SUCCESS = "auth/registerUserSuccess";
export const REGISTER_USER_FAILURE = "auth/registerUserFailure";
export const LOGIN_USER_START = "auth/loginUserStart";
export const LOGIN_USER_SUCCESS = "auth/loginUserSuccess";
export const LOGIN_USER_FAILURE = "auth/loginUserFailure";
export const LOGOUT_USER = "auth/logoutUser";
export const GET_PROFILE_SUCCESS = "auth/getProfileSuccess";
export const GET_PROFILE_FAILURE = "auth/getProfileFailure";

const registerUserStart = () => ({ type: REGISTER_USER_START });
const registerUserSuccess = (userData) => ({
  type: REGISTER_USER_SUCCESS,
  payload: userData,
});
const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

const loginUserStart = () => ({ type: LOGIN_USER_START });
const loginUserSuccess = (userData) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});
const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

const logout = () => ({ type: LOGOUT_USER });

const getOwnProfileSuccess = (userProfile) => ({
  type: GET_PROFILE_SUCCESS,
  payload: userProfile,
});
const getOwnProfileFailure = (error) => ({
  type: GET_PROFILE_FAILURE,
  payload: error,
});

const initialState = {
  user: null,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  isLoading: false,
  error: null,
  userProfile: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_START:
    case LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        userProfile: null,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

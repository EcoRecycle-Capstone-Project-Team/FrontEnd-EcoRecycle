import {
  FETCH_TPA_LOCATIONS_REQUEST,
  FETCH_TPA_LOCATIONS_SUCCESS,
  FETCH_TPA_LOCATIONS_FAILURE,
} from "./action";

const initialState = {
  loading: false,
  tpaLocations: [],
  error: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TPA_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TPA_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        tpaLocations: action.payload,
      };
    case FETCH_TPA_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mapReducer;

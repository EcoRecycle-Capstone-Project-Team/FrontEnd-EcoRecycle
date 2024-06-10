import {
  SET_TPA_LOCATIONS,
  SET_BANK_SAMPAH_LOCATIONS,
  SET_SELECTED_LOCATION,
  SET_USER_LOCATION,
  SET_SHOW_NEAREST,
} from "./action";

const initialState = {
  tpaLocations: [],
  bankSampahLocations: [],
  selectedLocation: null,
  userLocation: null,
  showNearest: false,
};

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TPA_LOCATIONS:
      return {
        ...state,
        tpaLocations: action.payload,
      };
    case SET_BANK_SAMPAH_LOCATIONS:
      return {
        ...state,
        bankSampahLocations: action.payload,
      };
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    case SET_SHOW_NEAREST:
      return {
        ...state,
        showNearest: action.payload,
      };
    default:
      return state;
  }
};

export default mapsReducer;

import { SET_SAMPAH_LOCATIONS, SET_SELECTED_SAMPAH_LOCATION } from "./action";

const initialState = {
  sampahLocations: [],
  selectedSampahLocation: null,
};

const mapSebaranSampahReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAMPAH_LOCATIONS:
      return {
        ...state,
        sampahLocations: action.payload,
      };
    case SET_SELECTED_SAMPAH_LOCATION:
      return {
        ...state,
        selectedSampahLocation: action.payload,
      };
    default:
      return state;
  }
};

export default mapSebaranSampahReducer;

// Action Types
export const SET_TPA_LOCATIONS = "SET_TPA_LOCATIONS";
export const SET_BANK_SAMPAH_LOCATIONS = "SET_BANK_SAMPAH_LOCATIONS";
export const SET_SELECTED_LOCATION = "SET_SELECTED_LOCATION";
export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const SET_SHOW_NEAREST = "SET_SHOW_NEAREST";

// Action Creators
export const setTpaLocations = (locations) => ({
  type: SET_TPA_LOCATIONS,
  payload: locations,
});

export const setBankSampahLocations = (locations) => ({
  type: SET_BANK_SAMPAH_LOCATIONS,
  payload: locations,
});

export const setSelectedLocation = (location) => ({
  type: SET_SELECTED_LOCATION,
  payload: location,
});

export const setUserLocation = (location) => ({
  type: SET_USER_LOCATION,
  payload: location,
});

export const setShowNearest = (show) => ({
  type: SET_SHOW_NEAREST,
  payload: show,
});

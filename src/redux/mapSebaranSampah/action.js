// Action Types
export const SET_SAMPAH_LOCATIONS = "SET_SAMPAH_LOCATIONS";
export const SET_SELECTED_SAMPAH_LOCATION = "SET_SELECTED_SAMPAH_LOCATION";

// Action Creators
export const setSampahLocations = (locations) => ({
  type: SET_SAMPAH_LOCATIONS,
  payload: locations,
});

export const setSelectedSampahLocation = (location) => ({
  type: SET_SELECTED_SAMPAH_LOCATION,
  payload: location,
});

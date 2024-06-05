import { fetchTpaLocations } from "../../utils/api";

// Action Types
export const FETCH_TPA_LOCATIONS_REQUEST = "FETCH_TPA_LOCATIONS_REQUEST";
export const FETCH_TPA_LOCATIONS_SUCCESS = "FETCH_TPA_LOCATIONS_SUCCESS";
export const FETCH_TPA_LOCATIONS_FAILURE = "FETCH_TPA_LOCATIONS_FAILURE";

// Action Creators
export const fetchTpaLocationsRequest = () => ({
  type: FETCH_TPA_LOCATIONS_REQUEST,
});

export const fetchTpaLocationsSuccess = (data) => ({
  type: FETCH_TPA_LOCATIONS_SUCCESS,
  payload: data,
});

export const fetchTpaLocationsFailure = (error) => ({
  type: FETCH_TPA_LOCATIONS_FAILURE,
  payload: error,
});

// Async Action
export const fetchTpaLocationsAsync = () => async (dispatch) => {
  dispatch(fetchTpaLocationsRequest());
  try {
    const data = await fetchTpaLocations();
    dispatch(fetchTpaLocationsSuccess(data));
  } catch (error) {
    dispatch(fetchTpaLocationsFailure(error));
  }
};

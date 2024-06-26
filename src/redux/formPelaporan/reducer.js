import {
  SUBMIT_REPORT_REQUEST,
  SUBMIT_REPORT_SUCCESS,
  SUBMIT_REPORT_FAILURE,
} from "./action";

const initialState = {
  loading: false,
  error: null,
  reportData: null,
};

const formPelaporanReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUBMIT_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        reportData: action.payload,
      };
    case SUBMIT_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default formPelaporanReducer;

import { submitReport } from "../../utils/api";

// Action Types
export const SUBMIT_REPORT_REQUEST = "SUBMIT_REPORT_REQUEST";
export const SUBMIT_REPORT_SUCCESS = "SUBMIT_REPORT_SUCCESS";
export const SUBMIT_REPORT_FAILURE = "SUBMIT_REPORT_FAILURE";

// Action Creators
export const submitReportRequest = () => ({
  type: SUBMIT_REPORT_REQUEST,
});

export const submitReportSuccess = (data) => ({
  type: SUBMIT_REPORT_SUCCESS,
  payload: data,
});

export const submitReportFailure = (error) => ({
  type: SUBMIT_REPORT_FAILURE,
  payload: error,
});

// Async Action
export const submitReportAsync = (formData, reportType) => async (dispatch) => {
  dispatch(submitReportRequest());
  try {
    const data = await submitReport(formData, reportType);
    dispatch(submitReportSuccess(data));
    window.location.href = "/dashboard";
  } catch (error) {
    dispatch(submitReportFailure(error));
    alert("Gagal mengirim laporan.");
  }
};

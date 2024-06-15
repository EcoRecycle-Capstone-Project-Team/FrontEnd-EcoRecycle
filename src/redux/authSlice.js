import {
  registerUser,
  loginUser,
  getOwnProfile,
  updateStatusPelaporan,
  getAllPelaporan,
  getAllPelaporanSampah,
  updateStatusPelaporanSampah,
  getDashboardStats,
  updatePelaporan,
  deletePelaporan,
  getPelaporanById,
  updateSampahReport,
  deleteSampahReport,
  getSampahReportById,
  getUserReports,
  deleteUserReportById,
  getUserReportsTPA,
  deleteUserPelaporanById,
  updateUserProfile,
} from "../utils/api";

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

export const loginAdminAsync = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(loginUserStart());
    try {
      const response = await loginUser(email, password);
      const { token, user } = response.data;
      if (user.role !== "admin") {
        throw new Error("Akses ditolak: Anda bukan admin.");
      }
      localStorage.setItem("token", token);
      dispatch(loginUserSuccess(user));
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

export const getAllPelaporanAsync = () => {
  return async (dispatch) => {
    dispatch(getAllPelaporanStart());
    try {
      const response = await getAllPelaporan();
      dispatch(getAllPelaporanSuccess(response));
    } catch (error) {
      dispatch(getAllPelaporanFailure(error.message));
    }
  };
};

export const updateStatusPelaporanAsync = (id, status) => {
  return async (dispatch) => {
    dispatch(updateStatusStart());
    try {
      const response = await updateStatusPelaporan(id, status);
      dispatch(updateStatusSuccess(response));
    } catch (error) {
      dispatch(updateStatusFailure(error.message));
    }
  };
};

export const handleAcc = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(updateStatusPelaporanAsync(id, "verify"));
      await dispatch(getAllPelaporanAsync());
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export const handleReject = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(updateStatusPelaporanAsync(id, "not verify"));
      await dispatch(getAllPelaporanAsync());
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export const getAllPelaporanSampahAsync = () => {
  return async (dispatch) => {
    dispatch(getAllPelaporanSampahStart());
    try {
      const response = await getAllPelaporanSampah();
      dispatch(getAllPelaporanSampahSuccess(response));
    } catch (error) {
      dispatch(getAllPelaporanSampahFailure(error.message));
    }
  };
};

export const updateStatusPelaporanSampahAsync = (id, status) => {
  return async (dispatch) => {
    dispatch(updateStatusSampahStart());
    try {
      const response = await updateStatusPelaporanSampah(id, status);
      dispatch(updateStatusSampahSuccess(response));
    } catch (error) {
      dispatch(updateStatusSampahFailure(error.message));
    }
  };
};

export const handleAccSampah = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(updateStatusPelaporanSampahAsync(id, "resolved"));
      await dispatch(getAllPelaporanSampahAsync());
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export const handleRejectSampah = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(updateStatusPelaporanSampahAsync(id, "pending"));
      await dispatch(getAllPelaporanSampahAsync());
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export const handleInProgressSampah = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(updateStatusPelaporanSampahAsync(id, "in_progress"));
      await dispatch(getAllPelaporanSampahAsync());
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export const getDashboardStatsAsync = (token) => {
  return async (dispatch) => {
    dispatch(getDashboardStatsStart());
    try {
      const response = await getDashboardStats(token);
      dispatch(getDashboardStatsSuccess(response.data));
    } catch (error) {
      dispatch(getDashboardStatsFailure(error.message));
    }
  };
};

export const updatePelaporanAsync = (id, updateData) => {
  return async (dispatch) => {
    dispatch(updatePelaporanStart());
    try {
      const response = await updatePelaporan(id, updateData);
      dispatch(updatePelaporanSuccess(response));
    } catch (error) {
      dispatch(updatePelaporanFailure(error.message));
    }
  };
};

export const deletePelaporanAsync = (id) => {
  return async (dispatch) => {
    dispatch(deletePelaporanStart());
    try {
      await deletePelaporan(id);
      dispatch(deletePelaporanSuccess(id));
    } catch (error) {
      dispatch(deletePelaporanFailure(error.message));
    }
  };
};

export const getPelaporanByIdAsync = (id, token) => {
  return async (dispatch) => {
    dispatch(getPelaporanByIdStart());
    try {
      const response = await getPelaporanById(id, token);
      dispatch(getPelaporanByIdSuccess(response.data));
    } catch (error) {
      dispatch(getPelaporanByIdFailure(error.message));
    }
  };
};

export const updateSampahReportAsync = (id, updateData) => {
  return async (dispatch) => {
    dispatch(updateSampahReportStart());
    try {
      const response = await updateSampahReport(id, updateData);
      dispatch(updateSampahReportSuccess(response));
    } catch (error) {
      dispatch(updateSampahReportFailure(error.message));
    }
  };
};

export const deleteSampahReportAsync = (id) => {
  return async (dispatch) => {
    dispatch(deleteSampahReportStart());
    try {
      await deleteSampahReport(id);
      dispatch(deleteSampahReportSuccess(id));
    } catch (error) {
      dispatch(deleteSampahReportFailure(error.message));
    }
  };
};

export const getSampahReportByIdAsync = (id, token) => {
  return async (dispatch) => {
    dispatch(getSampahReportByIdStart());
    try {
      const response = await getSampahReportById(id, token);
      dispatch(getSampahReportByIdSuccess(response.data));
    } catch (error) {
      dispatch(getSampahReportByIdFailure(error.message));
    }
  };
};

export const getUserReportsAsync = (id) => {
  return async (dispatch) => {
    dispatch(getUserReportsStart());
    try {
      const response = await getUserReports(id);
      dispatch(getUserReportsSuccess(response.data));
    } catch (error) {
      dispatch(getUserReportsFailure(error.message));
    }
  };
};

export const deleteUserReportByIdAsync = (id) => {
  return async (dispatch) => {
    dispatch(deleteUserReportStart());
    try {
      await deleteUserReportById(id);
      dispatch(deleteUserReportSuccess(id));
    } catch (error) {
      dispatch(deleteUserReportFailure(error.message));
    }
  };
};

export const getUserReportsTPAAsync = (id) => {
  return async (dispatch) => {
    dispatch(getUserReportsTPAStart());
    try {
      const response = await getUserReportsTPA(id);
      dispatch(getUserReportsTPASuccess(response.data));
    } catch (error) {
      dispatch(getUserReportsTPAFailure(error.response.data));
    }
  };
};

export const deleteUserReportTPAAsync = (id) => {
  return async (dispatch) => {
    dispatch(deleteUserReportTPAStart());
    try {
      await deleteUserPelaporanById(id);
      dispatch(deleteUserReportTPASuccess(id));
    } catch (error) {
      dispatch(deleteUserReportTPAFailure(error.response.data));
    }
  };
};

export const updateUserProfileAsync = (id, profileData, token) => {
  return async (dispatch) => {
    dispatch(updateUserProfileStart());
    try {
      await updateUserProfile(id, profileData, token);
      dispatch(updateUserProfileSuccess(profileData));
    } catch (error) {
      dispatch(updateUserProfileFailure(error.message));
    }
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

export const GET_ALL_PELAPORAN_START = "pelaporan/getAllPelaporanStart";
export const GET_ALL_PELAPORAN_SUCCESS = "pelaporan/getAllPelaporanSuccess";
export const GET_ALL_PELAPORAN_FAILURE = "pelaporan/getAllPelaporanFailure";
export const UPDATE_STATUS_START = "pelaporan/updateStatusStart";
export const UPDATE_STATUS_SUCCESS = "pelaporan/updateStatusSuccess";
export const UPDATE_STATUS_FAILURE = "pelaporan/updateStatusFailure";

export const GET_ALL_PELAPORAN_SAMPAH_START =
  "pelaporan/getAllPelaporanSampahStart";
export const GET_ALL_PELAPORAN_SAMPAH_SUCCESS =
  "pelaporan/getAllPelaporanSampahSuccess";
export const GET_ALL_PELAPORAN_SAMPAH_FAILURE =
  "pelaporan/getAllPelaporanSampahFailure";
export const UPDATE_STATUS_SAMPAH_START = "pelaporan/updateStatusSampahStart";
export const UPDATE_STATUS_SAMPAH_SUCCESS =
  "pelaporan/updateStatusSampahSuccess";
export const UPDATE_STATUS_SAMPAH_FAILURE =
  "pelaporan/updateStatusSampahFailure";

export const GET_DASHBOARD_STATS_START = "dashboard/getDashboardStatsStart";
export const GET_DASHBOARD_STATS_SUCCESS = "dashboard/getDashboardStatsSuccess";
export const GET_DASHBOARD_STATS_FAILURE = "dashboard/getDashboardStatsFailure";

export const UPDATE_PELAPORAN_START = "pelaporan/updatePelaporanStart";
export const UPDATE_PELAPORAN_SUCCESS = "pelaporan/updatePelaporanSuccess";
export const UPDATE_PELAPORAN_FAILURE = "pelaporan/updatePelaporanFailure";

export const DELETE_PELAPORAN_START = "pelaporan/deletePelaporanStart";
export const DELETE_PELAPORAN_SUCCESS = "pelaporan/deletePelaporanSuccess";
export const DELETE_PELAPORAN_FAILURE = "pelaporan/deletePelaporanFailure";

export const GET_PELAPORAN_BY_ID_START = "pelaporan/getPelaporanByIdStart";
export const GET_PELAPORAN_BY_ID_SUCCESS = "pelaporan/getPelaporanByIdSuccess";
export const GET_PELAPORAN_BY_ID_FAILURE = "pelaporan/getPelaporanByIdFailure";

export const UPDATE_SAMPAH_REPORT_START = "sampah/updateSampahReportStart";
export const UPDATE_SAMPAH_REPORT_SUCCESS = "sampah/updateSampahReportSuccess";
export const UPDATE_SAMPAH_REPORT_FAILURE = "sampah/updateSampahReportFailure";

export const DELETE_SAMPAH_REPORT_START = "sampah/deleteSampahReportStart";
export const DELETE_SAMPAH_REPORT_SUCCESS = "sampah/deleteSampahReportSuccess";
export const DELETE_SAMPAH_REPORT_FAILURE = "sampah/deleteSampahReportFailure";

export const GET_SAMPAH_REPORT_BY_ID_START = "sampah/getSampahReportByIdStart";
export const GET_SAMPAH_REPORT_BY_ID_SUCCESS =
  "sampah/getSampahReportByIdSuccess";
export const GET_SAMPAH_REPORT_BY_ID_FAILURE =
  "sampah/getSampahReportByIdFailure";

export const GET_USER_REPORTS_START = "reports/getUserReportsStart";
export const GET_USER_REPORTS_SUCCESS = "reports/getUserReportsSuccess";
export const GET_USER_REPORTS_FAILURE = "reports/getUserReportsFailure";

export const DELETE_USER_REPORT_START = "reports/deleteUserReportStart";
export const DELETE_USER_REPORT_SUCCESS = "reports/deleteUserReportSuccess";
export const DELETE_USER_REPORT_FAILURE = "reports/deleteUserReportFailure";

export const GET_USER_REPORTS_TPA_START = "reports/getUserReportsTPAStart";
export const GET_USER_REPORTS_TPA_SUCCESS = "reports/getUserReportsTPASuccess";
export const GET_USER_REPORTS_TPA_FAILURE = "reports/getUserReportsTPAFailure";

export const DELETE_USER_REPORT_TPA_START = "reports/deleteUserReportTPAStart";
export const DELETE_USER_REPORT_TPA_SUCCESS =
  "reports/deleteUserReportTPASuccess";
export const DELETE_USER_REPORT_TPA_FAILURE =
  "reports/deleteUserReportTPAFailure";

export const UPDATE_USER_PROFILE_START = "profile/updateUserProfileStart";
export const UPDATE_USER_PROFILE_SUCCESS = "profile/updateUserProfileSuccess";
export const UPDATE_USER_PROFILE_FAILURE = "profile/updateUserProfileFailure";

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

const getAllPelaporanStart = () => ({ type: GET_ALL_PELAPORAN_START });
const getAllPelaporanSuccess = (data) => ({
  type: GET_ALL_PELAPORAN_SUCCESS,
  payload: data,
});
const getAllPelaporanFailure = (error) => ({
  type: GET_ALL_PELAPORAN_FAILURE,
  payload: error,
});

const updateStatusStart = () => ({ type: UPDATE_STATUS_START });
const updateStatusSuccess = (data) => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: data,
});
const updateStatusFailure = (error) => ({
  type: UPDATE_STATUS_FAILURE,
  payload: error,
});

const getAllPelaporanSampahStart = () => ({
  type: GET_ALL_PELAPORAN_SAMPAH_START,
});
const getAllPelaporanSampahSuccess = (data) => ({
  type: GET_ALL_PELAPORAN_SAMPAH_SUCCESS,
  payload: data,
});
const getAllPelaporanSampahFailure = (error) => ({
  type: GET_ALL_PELAPORAN_SAMPAH_FAILURE,
  payload: error,
});

const updateStatusSampahStart = () => ({ type: UPDATE_STATUS_SAMPAH_START });
const updateStatusSampahSuccess = (data) => ({
  type: UPDATE_STATUS_SAMPAH_SUCCESS,
  payload: data,
});
const updateStatusSampahFailure = (error) => ({
  type: UPDATE_STATUS_SAMPAH_FAILURE,
  payload: error,
});

const getDashboardStatsStart = () => ({ type: GET_DASHBOARD_STATS_START });
const getDashboardStatsSuccess = (data) => ({
  type: GET_DASHBOARD_STATS_SUCCESS,
  payload: data,
});
const getDashboardStatsFailure = (error) => ({
  type: GET_DASHBOARD_STATS_FAILURE,
  payload: error,
});

const updatePelaporanStart = () => ({ type: UPDATE_PELAPORAN_START });
const updatePelaporanSuccess = (data) => ({
  type: UPDATE_PELAPORAN_SUCCESS,
  payload: data,
});
const updatePelaporanFailure = (error) => ({
  type: UPDATE_PELAPORAN_FAILURE,
  payload: error,
});

const deletePelaporanStart = () => ({ type: DELETE_PELAPORAN_START });
const deletePelaporanSuccess = (id) => ({
  type: DELETE_PELAPORAN_SUCCESS,
  payload: id,
});
const deletePelaporanFailure = (error) => ({
  type: DELETE_PELAPORAN_FAILURE,
  payload: error,
});

const getPelaporanByIdStart = () => ({ type: GET_PELAPORAN_BY_ID_START });
const getPelaporanByIdSuccess = (data) => ({
  type: GET_PELAPORAN_BY_ID_SUCCESS,
  payload: data,
});
const getPelaporanByIdFailure = (error) => ({
  type: GET_PELAPORAN_BY_ID_FAILURE,
  payload: error,
});

const updateSampahReportStart = () => ({ type: UPDATE_SAMPAH_REPORT_START });
const updateSampahReportSuccess = (data) => ({
  type: UPDATE_SAMPAH_REPORT_SUCCESS,
  payload: data,
});
const updateSampahReportFailure = (error) => ({
  type: UPDATE_SAMPAH_REPORT_FAILURE,
  payload: error,
});

const deleteSampahReportStart = () => ({ type: DELETE_SAMPAH_REPORT_START });
const deleteSampahReportSuccess = (id) => ({
  type: DELETE_SAMPAH_REPORT_SUCCESS,
  payload: id,
});
const deleteSampahReportFailure = (error) => ({
  type: DELETE_SAMPAH_REPORT_FAILURE,
  payload: error,
});

const getSampahReportByIdStart = () => ({
  type: GET_SAMPAH_REPORT_BY_ID_START,
});
const getSampahReportByIdSuccess = (data) => ({
  type: GET_SAMPAH_REPORT_BY_ID_SUCCESS,
  payload: data,
});
const getSampahReportByIdFailure = (error) => ({
  type: GET_SAMPAH_REPORT_BY_ID_FAILURE,
  payload: error,
});

const getUserReportsStart = () => ({ type: GET_USER_REPORTS_START });
const getUserReportsSuccess = (data) => ({
  type: GET_USER_REPORTS_SUCCESS,
  payload: data,
});
const getUserReportsFailure = (error) => ({
  type: GET_USER_REPORTS_FAILURE,
  payload: error,
});

const deleteUserReportStart = () => ({ type: DELETE_USER_REPORT_START });
const deleteUserReportSuccess = (id) => ({
  type: DELETE_USER_REPORT_SUCCESS,
  payload: id,
});
const deleteUserReportFailure = (error) => ({
  type: DELETE_USER_REPORT_FAILURE,
  payload: error,
});

const getUserReportsTPAStart = () => ({ type: GET_USER_REPORTS_TPA_START });
const getUserReportsTPASuccess = (data) => ({
  type: GET_USER_REPORTS_TPA_SUCCESS,
  payload: data,
});
const getUserReportsTPAFailure = (error) => ({
  type: GET_USER_REPORTS_TPA_FAILURE,
  payload: error,
});

const deleteUserReportTPAStart = () => ({ type: DELETE_USER_REPORT_TPA_START });
const deleteUserReportTPASuccess = (id) => ({
  type: DELETE_USER_REPORT_TPA_SUCCESS,
  payload: id,
});
const deleteUserReportTPAFailure = (error) => ({
  type: DELETE_USER_REPORT_TPA_FAILURE,
  payload: error,
});

export const updateUserProfileStart = () => ({
  type: UPDATE_USER_PROFILE_START,
});

export const updateUserProfileSuccess = (data) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: data,
});

export const updateUserProfileFailure = (error) => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  payload: error,
});

const initialState = {
  user: null,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  isLoading: false,
  error: null,
  userProfile: null,
  pelaporan: [],
  pelaporanSampah: [],
  userReports: [],
  userReportsTPA: [],
  updateStatusLoading: false,
  updateStatusError: null,
  singlePelaporan: null,
  dashboardStats: {
    totalReports: null,
    totalCompletedReports: null,
    totalUsers: null,
  },
  dashboardStatsLoading: false,
  dashboardStatsError: null,
  sampahReportDet: null,
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
    case UPDATE_STATUS_START:
      return {
        ...state,
        updateStatusLoading: true,
        updateStatusError: null,
      };
    case UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        updateStatusLoading: false,
        pelaporan: state.pelaporan.map((report) =>
          report.id === action.payload.id
            ? { ...report, status: action.payload.status }
            : report
        ),
      };
    case UPDATE_STATUS_FAILURE:
      return {
        ...state,
        updateStatusLoading: false,
        updateStatusError: action.payload,
      };
    case GET_ALL_PELAPORAN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_PELAPORAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pelaporan: action.payload.data,
      };
    case GET_ALL_PELAPORAN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_PELAPORAN_SAMPAH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_PELAPORAN_SAMPAH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pelaporanSampah: action.payload.data,
      };
    case GET_ALL_PELAPORAN_SAMPAH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_STATUS_SAMPAH_START:
      return {
        ...state,
        updateStatusLoading: true,
        updateStatusError: null,
      };
    case UPDATE_STATUS_SAMPAH_SUCCESS:
      return {
        ...state,
        updateStatusLoading: false,
        pelaporanSampah: state.pelaporanSampah.map((report) =>
          report.id === action.payload.id
            ? { ...report, status: action.payload.status }
            : report
        ),
      };
    case UPDATE_STATUS_SAMPAH_FAILURE:
      return {
        ...state,
        updateStatusLoading: false,
        updateStatusError: action.payload,
      };
    case GET_DASHBOARD_STATS_START:
      return {
        ...state,
        dashboardStatsLoading: true,
        dashboardStatsError: null,
      };
    case GET_DASHBOARD_STATS_SUCCESS:
      return {
        ...state,
        dashboardStatsLoading: false,
        dashboardStats: action.payload,
      };
    case GET_DASHBOARD_STATS_FAILURE:
      return {
        ...state,
        dashboardStatsLoading: false,
        dashboardStatsError: action.payload,
      };
    case UPDATE_PELAPORAN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_PELAPORAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pelaporan: state.pelaporan.map((report) =>
          report.id === action.payload.id ? action.payload : report
        ),
      };
    case UPDATE_PELAPORAN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_PELAPORAN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_PELAPORAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pelaporan: state.pelaporan.filter(
          (report) => report.id !== action.payload
        ),
      };
    case DELETE_PELAPORAN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_PELAPORAN_BY_ID_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_PELAPORAN_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singlePelaporan: action.payload,
      };
    case GET_PELAPORAN_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_SAMPAH_REPORT_START:
    case DELETE_SAMPAH_REPORT_START:
    case GET_SAMPAH_REPORT_BY_ID_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_SAMPAH_REPORT_SUCCESS:
    case GET_SAMPAH_REPORT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sampahReportDet: action.payload,
      };
    case DELETE_SAMPAH_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pelaporanSampah: state.pelaporanSampah.filter(
          (report) => report.id !== action.payload
        ),
      };
    case UPDATE_SAMPAH_REPORT_FAILURE:
    case DELETE_SAMPAH_REPORT_FAILURE:
    case GET_SAMPAH_REPORT_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_USER_REPORTS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_USER_REPORTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReports: action.payload,
      };
    case GET_USER_REPORTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_USER_REPORT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_USER_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReports: state.userReports.filter(
          (report) => report.id !== action.payload
        ),
      };
    case DELETE_USER_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_USER_REPORTS_TPA_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_USER_REPORTS_TPA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReportsTPA: action.payload,
      };
    case GET_USER_REPORTS_TPA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_USER_REPORT_TPA_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_USER_REPORT_TPA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReportsTPA: state.userReportsTPA.filter(
          (report) => report.id !== action.payload
        ),
      };
    case DELETE_USER_REPORT_TPA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_USER_PROFILE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: action.payload,
      };
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

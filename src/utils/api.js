import axios from "axios";

const forumAPI = axios.create({
  baseURL: "https://api.ecorecycle.my.id/",
});

export const registerUser = async (username, email, password) => {
  try {
    const response = await forumAPI.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await forumAPI.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOwnProfile = async (token) => {
  try {
    const response = await forumAPI.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const submitReport = async (formData, reportType) => {
  try {
    const endpoint =
      reportType === "sampah" ? "/report/newsampah" : "/report/newtpa";
    const response = await forumAPI.post(endpoint, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchTpaLocations = async () => {
  try {
    const response = await forumAPI.get("/report/tpa");
    const filteredData = response.data.data
      .filter((tpa) => tpa.status === "verify")
      .map((tpa) => ({
        lat: parseFloat(tpa.latitude),
        lng: parseFloat(tpa.longitude),
        name: tpa.nama_lokasi,
        status: "Operasional",
        jenis_lokasi: tpa.jenis_lokasi,
        image: tpa.img_tpa
          ? `https://api.ecorecycle.my.id/img/${tpa.img_tpa}`
          : null,
        nama_pelapor: tpa.nama_pelapor,
        alamat: tpa.alamat,
        kota: tpa.kota,
        kode_pos: tpa.kode_pos,
        provinsi: tpa.provinsi,
        created_at: tpa.created_at,
      }));
    return filteredData;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchSampahLocations = async () => {
  try {
    const response = await forumAPI.get("/report/sampah");
    const filteredData = response.data.data.map((sampah) => ({
      lat: parseFloat(sampah.latitude),
      lng: parseFloat(sampah.longitude),
      name: sampah.nama_lokasi,
      status: sampah.status,
      image: sampah.img_bukti
        ? `https://api.ecorecycle.my.id/img/${sampah.img_bukti}`
        : null,
      nama_pelapor: sampah.nama_pelapor,
      alamat: sampah.alamat,
      deskripsi: sampah.deskripsi,
      kota: sampah.kota,
      kode_pos: sampah.kode_pos,
      created_at: sampah.created_at,
    }));
    return filteredData;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateStatusPelaporan = async (id, status) => {
  try {
    const response = await forumAPI.patch(`/report/tpa/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllPelaporan = async () => {
  try {
    const response = await forumAPI.get("/report/tpa");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateStatusPelaporanSampah = async (id, status) => {
  try {
    const response = await forumAPI.patch(`/report/sampah/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllPelaporanSampah = async () => {
  try {
    const response = await forumAPI.get("/report/sampah");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTotalReports = async (token) => {
  try {
    const response = await forumAPI.get("/total-reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTotalCompletedReports = async (token) => {
  try {
    const response = await forumAPI.get("/total-completed-reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTotalUsers = async (token) => {
  try {
    const response = await forumAPI.get("/total-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDashboardStats = async (token) => {
  try {
    const response = await forumAPI.get("/dashboard-stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePelaporan = async (id, updateData) => {
  try {
    const response = await forumAPI.put(`/report/tpa/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePelaporan = async (id) => {
  try {
    const response = await forumAPI.delete(`/report/tpa/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPelaporanById = async (id, token) => {
  try {
    const response = await forumAPI.get(`/report/tpa/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSampahReport = async (id, updateData) => {
  try {
    const response = await forumAPI.put(`/report/sampah/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteSampahReport = async (id) => {
  try {
    const response = await forumAPI.delete(`/report/sampah/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSampahReportById = async (id, token) => {
  try {
    const response = await forumAPI.get(`/report/sampah/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserReports = async (id) => {
  try {
    const response = await forumAPI.get(`/report/sampah/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUserReportById = async (id) => {
  try {
    const response = await forumAPI.delete(`/report/sampah/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserReportsTPA = async (id) => {
  try {
    const response = await forumAPI.get(`/report/tpa/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUserPelaporanById = async (id) => {
  try {
    const response = await forumAPI.delete(`/report/tpa/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserProfile = async (id, profileData, token) => {
  try {
    const formData = new FormData();
    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }

    const response = await forumAPI.put(
      `/users/update-profile/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

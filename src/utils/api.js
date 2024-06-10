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

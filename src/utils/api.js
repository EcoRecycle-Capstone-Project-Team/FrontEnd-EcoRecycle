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

export const submitReport = async (formData) => {
  try {
    const response = await forumAPI.post("/report/newtpa", formData);
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
        image: tpa.img_tpa
          ? `https://api.ecorecycle.my.id/img/${tpa.img_tpa}`
          : null,
      }));
    return filteredData;
  } catch (error) {
    throw error.response.data;
  }
};

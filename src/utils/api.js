import axios from "axios";

const forumAPI = axios.create({
  baseURL: "https://isepwebtim.my.id",
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

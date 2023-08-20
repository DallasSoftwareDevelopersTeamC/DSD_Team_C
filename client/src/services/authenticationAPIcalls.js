const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import axios from "axios";

export const authenticateUser = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/authentication/authenticateUser`,
      {
        withCredentials: true,
      }
    );

    const responseBody = response.data;

    if (response.status === 401) {
      if (responseBody.error === "TokenExpiredError") {
        throw new Error("TokenExpired");
      } else {
        throw new Error("Unauthorized");
      }
    }

    return responseBody;

  } catch (error) {
    console.error("Error during authentication:", error.message);
    throw error;
  }
};


export const getToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/authentication/token`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching the token:", error.message);
    throw new Error(error.response?.data?.error || "UnknownError");
  }
};

export const createUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating the user:", error.message);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error logging in the user:", error.message);
    throw error;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const response = await axios.patch(`${API_URL}/user/${id}`, updates, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating the user:", error.message);
    throw error;
  }
};

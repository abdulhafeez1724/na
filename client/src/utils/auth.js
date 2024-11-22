import Cookies from "js-cookie";

// Login function to get JWT tokens and store them in cookies
export const login = async (username, password) => {
  const response = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    // Store access and refresh tokens in cookies securely
    Cookies.set("access_token", data.access, { expires: 1, secure: true });
    Cookies.set("refresh_token", data.refresh, { expires: 7, secure: true });
    return data;
  } else {
    throw new Error("Login failed");
  }
};

// Function to refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    Cookies.set("access_token", data.access, { expires: 1, secure: true });
    return data.access;
  } else {
    throw new Error("Failed to refresh token");
  }
};

// Check if the user is authenticated by checking for the presence of the access token
export const isAuthenticated = () => {
  return !!Cookies.get("access_token");
};

// Logout function to remove the tokens from cookies
export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};

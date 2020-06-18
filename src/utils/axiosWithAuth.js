import axios from "axios";

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem("user-token")) ? JSON.parse(localStorage.getItem("user-token")).token : null;

  const baseUrl = "https://the-cocktail-compendium.herokuapp.com";

  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: token,
    },
  })
};

export default axiosWithAuth
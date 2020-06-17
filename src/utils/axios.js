import axios from "axios";

export const axios = () => {
  const baseUrl = "https://the-cocktail-compendium.herokuapp.com";
  return axios.create({baseURL: baseUrl})
};

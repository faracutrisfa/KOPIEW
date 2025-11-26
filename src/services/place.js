import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getPlaces = () => axios.get(`${API_URL}/place`);

export const getPlaceById = (id) => axios.get(`${API_URL}/place/${id}`);

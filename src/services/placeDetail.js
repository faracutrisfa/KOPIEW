import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const place = () => axios.get(`${API_URL}/place`);

export const placeDetail = (id) => axios.get(`${API_URL}/place/${id}`);

export const placeReviews = (id) => axios.get(`${API_URL}/place/${id}/reviews`);



import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getPlaces = () => axios.get(`${API_URL}/place`);

export const getPlaceById = (id) => axios.get(`${API_URL}/place/${id}`);

export const createPlace = (placeData) => {
    return axios.post(`${API_URL}/place`, placeData, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}


export const uploadPlacePhoto = (placeId, formData) => {
    return axios.post(`${API_URL}/place/${placeId}/photos`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
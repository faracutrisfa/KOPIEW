import axios from "axios";

const API_URL = "http://localhost:8000/api";

const authHeader = () => ({
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
});

export const getWishlists = () => {
    return axios.get(`${API_URL}/wishlists`, authHeader());
};

export const createWishlist = (placeId) => {
    const data = { 
        name: `Wishlist for Place ${placeId}`, 
        place_id: placeId 
    };
    return axios.post(`${API_URL}/wishlists`, data, authHeader());
};

export const deleteWishlistItem = (wishlistId) => {
    return axios.delete(`${API_URL}/wishlists/${wishlistId}`, authHeader());
};
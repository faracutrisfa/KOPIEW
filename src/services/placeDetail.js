import { apiClient } from "./api";

export const place = () => apiClient.get(`/place`);

export const placeDetail = (id) => apiClient.get(`/place/${id}`);

export const placeReviews = (id) => apiClient.get(`/place/${id}/reviews`);

export const uploadReview = (id, reviewData) => {
    return apiClient.post(`/place/${id}/reviews`, reviewData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
}

export const reviewDelete = (id, reviewId) => {
    return apiClient.delete(`/place/${id}/reviews/${reviewId}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
}

export const getGallery = (id) => apiClient.get(`/place/${id}/photos`);

export const uploadGalleryImage = (placeId, formData) => {
    return apiClient.post(`/place/${placeId}/photos`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
}

export const deleteGalleryImage = (placeId, id) => {
    return apiClient.delete(`/place/${placeId}/photos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
}

export const getProfile = () => {
    return apiClient.get(`/profile`, {
        headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
}

export const getRating = async (placeId) => {
    const response = await placeReviews(placeId);
    let bintang1 = 0, bintang2 = 0, bintang3 = 0, bintang4 = 0, bintang5 = 0

    response.data.data.forEach(dt => {
        if (dt.rating === 1) {
            bintang1 += 1;
        } else if (dt.rating === 2) {
            bintang2 += 1*2;
        } else if (dt.rating === 3) {
            bintang3 += 1*3;
        } else if (dt.rating === 4) {
            bintang4 += 1*4;
        } else if (dt.rating === 5) {
            bintang5 += 1*5;
        }
    });

    return {
        bintang_1: bintang1,
        bintang_2: bintang2, 
        bintang_3: bintang3, 
        bintang_4: bintang4, 
        bintang_5: bintang5,
        total_bintang: bintang1 + bintang2 + bintang3 + bintang4 + bintang5,
        total_reviewer: response.data.data.length
    }
}
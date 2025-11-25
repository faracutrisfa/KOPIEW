import { apiClient } from "../api";

/**
 * Thread Like Service
 * Handles thread like/unlike functionality
 */

/**
 * Toggle like on a thread (protected)
 * @param {number|string} threadId - Thread ID
 * @returns {Promise} Response with like status
 */
export const toggleThreadLike = (threadId) => {
  return apiClient.post(`/threads/${threadId}/like`);
};

/**
 * Check if user has liked a thread
 * This can be used if the API provides this endpoint
 * @param {number|string} threadId - Thread ID
 * @returns {Promise} Response with like status
 */
export const checkThreadLike = (threadId) => {
  return apiClient.get(`/threads/${threadId}/like`);
};

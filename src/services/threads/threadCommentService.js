import { apiClient } from "../api";

export const getThreadComments = (threadId, params = {}) => {
  return apiClient.get(`/threads/${threadId}/comments`, { params });
};
export const addThreadComment = (threadId, commentData) => {
  return apiClient.post(`/threads/${threadId}/comments`, commentData);
};

export const updateThreadComment = (threadId, commentId, commentData) => {
  return apiClient.put(
    `/threads/${threadId}/comments/${commentId}`,
    commentData
  );
};

export const deleteThreadComment = (threadId, commentId) => {
  return apiClient.delete(`/threads/${threadId}/comments/${commentId}`);
};

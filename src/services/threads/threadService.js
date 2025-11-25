import { apiClient } from "../api";

export const getAllThreads = (params = {}) => {
  return apiClient.get("/threads", { params });
};

export const getThreadById = (threadId) => {
  return apiClient.get(`/threads/${threadId}`);
};

export const createThread = (threadData) => {
  if (threadData.image) {
    const formData = new FormData();
    Object.keys(threadData).forEach((key) => {
      formData.append(key, threadData[key]);
    });
    return apiClient.post("/threads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiClient.post("/threads", threadData);
};

export const updateThread = (threadId, threadData) => {
  if (threadData.image) {
    const formData = new FormData();
    Object.keys(threadData).forEach((key) => {
      formData.append(key, threadData[key]);
    });
    formData.append("_method", "PUT");
    return apiClient.post(`/threads/${threadId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiClient.put(`/threads/${threadId}`, threadData);
};

export const deleteThread = (threadId) => {
  return apiClient.delete(`/threads/${threadId}`);
};

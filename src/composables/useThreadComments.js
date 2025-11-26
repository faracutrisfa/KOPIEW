import { ref, computed } from "vue";
import {
  getThreadComments,
  addThreadComment,
  updateThreadComment,
  deleteThreadComment,
} from "../services/threads";

export function useThreadComments(threadId) {
  const comments = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: 20,
    total: 0,
  });

  const fetchComments = async (params = {}) => {
    if (!threadId) {
      error.value = "Thread ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await getThreadComments(threadId, params);
      console.log("Comments response:", response.data);

      // Laravel might return: { status, message, data: [...comments] }
      // Or with pagination: { status, message, data: { data: [...], meta: {...} } }
      const responseData = response.data.data || response.data;

      if (Array.isArray(responseData)) {
        comments.value = responseData;
      } else if (responseData.data && Array.isArray(responseData.data)) {
        // Paginated response
        comments.value = responseData.data;

        if (responseData.current_page) {
          pagination.value = {
            currentPage: responseData.current_page,
            totalPages: responseData.last_page,
            perPage: responseData.per_page,
            total: responseData.total,
          };
        }
      } else {
        comments.value = [];
      }

      console.log("Comments loaded:", comments.value);

      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch comments";
      console.error("Error fetching comments:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addComment = async (commentData) => {
    if (!threadId) {
      error.value = "Thread ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      console.log("Adding comment:", commentData);
      const response = await addThreadComment(threadId, commentData);
      console.log("Add comment response:", response.data);

      const newComment = response.data.data || response.data;
      console.log("New comment:", newComment);

      // Add to comments array
      comments.value.push(newComment);

      return newComment;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add comment";
      console.error("Error adding comment:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const editComment = async (commentId, commentData) => {
    if (!threadId) {
      error.value = "Thread ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await updateThreadComment(
        threadId,
        commentId,
        commentData
      );
      const updatedComment = response.data.data || response.data;

      const index = comments.value.findIndex((c) => c.id === commentId);
      if (index !== -1) {
        comments.value[index] = updatedComment;
      }

      return updatedComment;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to update comment";
      console.error("Error updating comment:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeComment = async (commentId) => {
    if (!threadId) {
      error.value = "Thread ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      await deleteThreadComment(threadId, commentId);

      const index = comments.value.findIndex((c) => c.id === commentId);
      if (index !== -1) {
        comments.value.splice(index, 1);
      }

      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to delete comment";
      console.error("Error deleting comment:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const hasComments = computed(() => comments.value.length > 0);
  const commentsCount = computed(() => comments.value.length);

  return {
    comments,
    loading,
    error,
    pagination,
    hasComments,
    commentsCount,
    fetchComments,
    addComment,
    editComment,
    removeComment,
  };
}

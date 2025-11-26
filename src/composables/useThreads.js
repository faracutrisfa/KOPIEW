import { ref, computed } from "vue";
import {
  getAllThreads,
  createThread,
  updateThread,
  deleteThread,
} from "../services/threads";

export function useThreads() {
  const threads = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    total: 0,
  });

  const fetchThreads = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await getAllThreads(params);

      const paginatedData = response.data.data || response.data;
      threads.value = paginatedData.data || paginatedData;
      console.log(threads.value);
      if (paginatedData.current_page) {
        pagination.value = {
          currentPage: paginatedData.current_page,
          totalPages: paginatedData.last_page,
          perPage: paginatedData.per_page,
          total: paginatedData.total,
        };
      }

      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch threads";
      console.error("Error fetching threads:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addThread = async (threadData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await createThread(threadData);
      const newThread = response.data.data || response.data;

      threads.value.unshift(newThread);

      return newThread;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to create thread";
      console.error("Error creating thread:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const editThread = async (threadId, threadData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await updateThread(threadId, threadData);
      const updatedThread = response.data.data || response.data;

      const index = threads.value.findIndex((t) => t.id === threadId);
      if (index !== -1) {
        threads.value[index] = updatedThread;
      }

      return updatedThread;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to update thread";
      console.error("Error updating thread:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeThread = async (threadId) => {
    loading.value = true;
    error.value = null;

    try {
      await deleteThread(threadId);

      const index = threads.value.findIndex((t) => t.id === threadId);
      if (index !== -1) {
        threads.value.splice(index, 1);
      }

      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to delete thread";
      console.error("Error deleting thread:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const hasThreads = computed(() => threads.value.length > 0);

  return {
    threads,
    loading,
    error,
    pagination,
    hasThreads,
    fetchThreads,
    addThread,
    editThread,
    removeThread,
  };
}

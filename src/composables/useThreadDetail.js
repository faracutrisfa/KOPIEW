import { ref, computed } from "vue";
import { getThreadById } from "../services/threads";

export function useThreadDetail(threadId) {
  const thread = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchThread = async () => {
    if (!threadId) {
      error.value = "Thread ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await getThreadById(threadId);
      thread.value = response.data.data || response.data;
      return thread.value;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch thread";
      console.error("Error fetching thread:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateThreadData = (updatedData) => {
    if (thread.value) {
      thread.value = { ...thread.value, ...updatedData };
    }
  };

  const hasThread = computed(() => thread.value !== null);

  return {
    thread,
    loading,
    error,
    hasThread,
    fetchThread,
    updateThreadData,
  };
}

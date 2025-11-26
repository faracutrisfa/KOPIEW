import { ref } from "vue";
import { toggleThreadLike } from "../services/threads";

export function useThreadLike(
  threadId,
  initialLiked = false,
  initialLikesCount = 0
) {
  const isLiked = ref(initialLiked);
  const likesCount = ref(initialLikesCount);
  const loading = ref(false);
  const error = ref(null);

  const toggleLike = async () => {
    if (!threadId) {
      error.value = "Thread ID is required";
      return;
    }

    const previousLiked = isLiked.value;
    const previousCount = likesCount.value;

    isLiked.value = !isLiked.value;
    likesCount.value += isLiked.value ? 1 : -1;

    loading.value = true;
    error.value = null;

    try {
      const response = await toggleThreadLike(threadId);

      if (response.data.data) {
        isLiked.value =
          response.data.data.is_liked || response.data.data.liked || false;
        likesCount.value = response.data.data.likes_count ?? likesCount.value;
      } else if (response.data) {
        isLiked.value = response.data.is_liked || response.data.liked || false;
        likesCount.value = response.data.likes_count ?? likesCount.value;
      }

      return response.data;
    } catch (err) {
      isLiked.value = previousLiked;
      likesCount.value = previousCount;

      error.value = err.response?.data?.message || "Failed to toggle like";
      console.error("Error toggling like:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setLikeState = (liked, count) => {
    isLiked.value = liked;
    likesCount.value = count;
  };

  return {
    isLiked,
    likesCount,
    loading,
    error,
    toggleLike,
    setLikeState,
  };
}

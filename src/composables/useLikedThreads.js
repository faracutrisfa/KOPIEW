import { ref } from "vue";

/**
 * Composable for managing liked threads state in localStorage
 * This is a frontend-only solution when backend doesn't return is_liked
 */

const LIKED_THREADS_KEY = "liked_threads";

// Get liked threads from localStorage
const getLikedThreads = () => {
  try {
    const stored = localStorage.getItem(LIKED_THREADS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading liked threads:", error);
    return [];
  }
};

// Save liked threads to localStorage
const saveLikedThreads = (threadIds) => {
  try {
    localStorage.setItem(LIKED_THREADS_KEY, JSON.stringify(threadIds));
  } catch (error) {
    console.error("Error saving liked threads:", error);
  }
};

export function useLikedThreads() {
  const likedThreadIds = ref(getLikedThreads());

  // Check if a thread is liked
  const isThreadLiked = (threadId) => {
    return likedThreadIds.value.includes(threadId);
  };

  // Add thread to liked list
  const addLikedThread = (threadId) => {
    if (!likedThreadIds.value.includes(threadId)) {
      likedThreadIds.value.push(threadId);
      saveLikedThreads(likedThreadIds.value);
    }
  };

  // Remove thread from liked list
  const removeLikedThread = (threadId) => {
    const index = likedThreadIds.value.indexOf(threadId);
    if (index > -1) {
      likedThreadIds.value.splice(index, 1);
      saveLikedThreads(likedThreadIds.value);
    }
  };

  // Toggle thread like status
  const toggleThreadLike = (threadId) => {
    if (isThreadLiked(threadId)) {
      removeLikedThread(threadId);
      return false; // unliked
    } else {
      addLikedThread(threadId);
      return true; // liked
    }
  };

  // Clear all liked threads (useful for logout)
  const clearLikedThreads = () => {
    likedThreadIds.value = [];
    saveLikedThreads([]);
  };

  return {
    likedThreadIds,
    isThreadLiked,
    addLikedThread,
    removeLikedThread,
    toggleThreadLike,
    clearLikedThreads,
  };
}

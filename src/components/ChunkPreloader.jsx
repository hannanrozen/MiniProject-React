import { useEffect } from "react";

const ChunkPreloader = () => {
  useEffect(() => {
    const preloadChunks = () => {
      // Preload critical chunks that will be needed soon
      const chunks = [
        "/src/components/UserCard.jsx",
        "/src/components/UserProfileCard.jsx",
        "/src/pages/UserDetailPage.jsx",
      ];

      chunks.forEach((chunk, index) => {
        const link = document.createElement("link");
        link.rel = "prefetch"; // Use prefetch for future navigation
        link.href = chunk;

        // Delay non-critical preloads
        setTimeout(() => {
          document.head.appendChild(link);
        }, index * 100);
      });
    };

    // Use requestIdleCallback for better performance
    if ("requestIdleCallback" in window) {
      requestIdleCallback(preloadChunks, { timeout: 2000 });
    } else {
      setTimeout(preloadChunks, 1000);
    }
  }, []);

  return null;
};

export default ChunkPreloader;

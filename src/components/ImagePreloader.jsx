import { useEffect } from "react";

const ImagePreloader = ({ images = [], priority = false }) => {
  useEffect(() => {
    if (!images.length) return;

    const preloadImages = () => {
      images.forEach((src, index) => {
        const img = new Image();

        // Set loading priority
        if (priority && index === 0) {
          img.loading = "eager";
          img.fetchPriority = "high";
        } else {
          img.loading = "lazy";
          img.fetchPriority = "low";
        }

        img.decoding = "async";
        img.src = src;

        // Add to DOM for preloading
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;

        if (priority && index === 0) {
          link.fetchPriority = "high";
          document.head.insertBefore(link, document.head.firstChild);
        } else {
          document.head.appendChild(link);
        }
      });
    };

    // Use requestIdleCallback for better performance
    if ("requestIdleCallback" in window) {
      requestIdleCallback(preloadImages);
    } else {
      setTimeout(preloadImages, 100);
    }
  }, [images, priority]);

  return null;
};

export default ImagePreloader;

import React, { useEffect } from "react";

const PreloadResources = () => {
  useEffect(() => {
    // Preload critical API
    const preloadAPI = () => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = "https://reqres.in/api/users?page=1";
      document.head.appendChild(link);
    };

    // Preload critical fonts
    const preloadFonts = () => {
      const systemFonts = [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
      ];

      // Use font-display: swap for better performance
      const style = document.createElement("style");
      style.textContent = `
        @font-face {
          font-family: 'SystemFont';
          src: local('${systemFonts.join("'), local('")}');
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    };

    // Optimize images with intersection observer
    const optimizeImages = () => {
      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute("data-src");
                  imageObserver.unobserve(img);
                }
              }
            });
          },
          {
            rootMargin: "50px",
          }
        );

        // Observe all lazy images
        setTimeout(() => {
          const lazyImages = document.querySelectorAll("img[data-src]");
          lazyImages.forEach((img) => imageObserver.observe(img));
        }, 1000);
      }
    };

    // Initialize optimizations
    preloadAPI();
    preloadFonts();
    optimizeImages();

    // Cleanup
    return () => {
      // Remove preloaded links if needed
    };
  }, []);

  return null;
};

export default PreloadResources;

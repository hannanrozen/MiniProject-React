import { useEffect } from "react";

// Advanced performance monitoring untuk Lighthouse metrics
const LighthouseOptimizer = () => {
  useEffect(() => {
    // 1. Resource Hints untuk faster loading
    const addResourceHints = () => {
      const head = document.head;

      // DNS prefetch untuk external resources
      const dnsPrefetch = document.createElement("link");
      dnsPrefetch.rel = "dns-prefetch";
      dnsPrefetch.href = "//reqres.in";
      head.appendChild(dnsPrefetch);

      // Preconnect untuk faster API calls
      const preconnect = document.createElement("link");
      preconnect.rel = "preconnect";
      preconnect.href = "https://reqres.in";
      head.appendChild(preconnect);

      // Prefetch critical API endpoint
      const prefetch = document.createElement("link");
      prefetch.rel = "prefetch";
      prefetch.href = "https://reqres.in/api/users";
      head.appendChild(prefetch);
    };

    // 2. Critical CSS optimization
    const optimizeCriticalCSS = () => {
      const criticalCSS = `
        /* Critical above-fold styles */
        .hero-section { will-change: transform; }
        .stats-card { contain: layout style paint; }
        .user-card { content-visibility: auto; }
        img { content-visibility: auto; }
        
        /* Optimize expensive properties */
        .backdrop-blur { backdrop-filter: none !important; }
        .gradient-expensive { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important; }
        
        /* Force GPU acceleration for smooth animations */
        .smooth-transform {
          transform: translateZ(0);
          will-change: transform;
        }
      `;

      const style = document.createElement("style");
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    };

    // 3. Image optimization setup
    const setupImageOptimization = () => {
      // Intersection Observer untuk lazy loading
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add("loaded");
                imageObserver.unobserve(img);
              }
            }
          });
        },
        { rootMargin: "50px" }
      );

      // Observer untuk semua images dengan data-src
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    };

    // 4. Reduce layout thrashing
    const optimizeLayoutPerformance = () => {
      // Optimize scroll performance
      let ticking = false;
      const optimizeScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Scroll optimizations here
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", optimizeScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", optimizeScroll);
      };
    };

    // 5. Memory optimization
    const optimizeMemoryUsage = () => {
      // Clear unused variables
      if (window.gc && typeof window.gc === "function") {
        setTimeout(() => window.gc(), 5000);
      }

      // Monitor memory usage
      if (performance.memory) {
        const memInfo = performance.memory;
        if (memInfo.usedJSHeapSize > 50 * 1024 * 1024) {
          // 50MB
          console.warn(
            "High memory usage detected:",
            Math.round(memInfo.usedJSHeapSize / 1024 / 1024) + "MB"
          );
        }
      }
    };

    // Execute optimizations
    addResourceHints();
    optimizeCriticalCSS();
    setupImageOptimization();
    const cleanupScroll = optimizeLayoutPerformance();
    optimizeMemoryUsage();

    // Cleanup
    return () => {
      if (cleanupScroll) cleanupScroll();
    };
  }, []);

  return null;
};

export default LighthouseOptimizer;

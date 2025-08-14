// Performance-aware error handling utilities
export class PerformanceErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 10; // Limit untuk avoid memory leaks
    this.initializeGlobalErrorHandling();
  }

  initializeGlobalErrorHandling() {
    // Global error handler untuk uncaught errors
    window.addEventListener("error", (event) => {
      this.handleError({
        type: "javascript",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: Date.now(),
      });
    });

    // Promise rejection handler
    window.addEventListener("unhandledrejection", (event) => {
      this.handleError({
        type: "promise",
        message: event.reason?.message || "Unhandled Promise Rejection",
        error: event.reason,
        timestamp: Date.now(),
      });
    });

    // Resource loading errors
    window.addEventListener(
      "error",
      (event) => {
        if (event.target !== window) {
          this.handleError({
            type: "resource",
            message: `Failed to load: ${event.target.src || event.target.href}`,
            element: event.target.tagName,
            timestamp: Date.now(),
          });
        }
      },
      true
    );
  }

  handleError(errorInfo) {
    // Add to errors array dengan limit
    this.errors.push(errorInfo);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift(); // Remove oldest error
    }

    // Performance-optimized logging
    this.logError(errorInfo);

    // Check jika error affect performance
    this.checkPerformanceImpact(errorInfo);
  }

  logError(errorInfo) {
    // Conditional logging untuk avoid performance impact
    if (import.meta.env.DEV) {
      console.group(`🚨 ${errorInfo.type.toUpperCase()} Error`);
      console.error("Message:", errorInfo.message);
      console.error("Timestamp:", new Date(errorInfo.timestamp).toISOString());
      if (errorInfo.error) {
        console.error("Stack:", errorInfo.error.stack);
      }
      console.groupEnd();
    }

    // Production error tracking (lightweight)
    if (import.meta.env.PROD) {
      this.reportErrorToAnalytics(errorInfo);
    }
  }

  reportErrorToAnalytics(errorInfo) {
    try {
      // Lightweight error reporting untuk production
      if (window.gtag) {
        window.gtag("event", "exception", {
          description: `${errorInfo.type}: ${errorInfo.message}`,
          fatal: false,
        });
      }

      // Custom error tracking (jika dibutuhkan)
      if (window.trackError) {
        window.trackError({
          type: errorInfo.type,
          message: errorInfo.message.substring(0, 100), // Limit message length
          timestamp: errorInfo.timestamp,
          userAgent: navigator.userAgent,
          url: window.location.pathname,
        });
      }
    } catch (reportError) {
      // Silent fail untuk avoid infinite error loops
      console.warn("Error reporting failed:", reportError);
    }
  }

  checkPerformanceImpact(errorInfo) {
    // Check jika error berulang yang bisa impact performance
    const recentErrors = this.errors.filter(
      (error) =>
        error.message === errorInfo.message &&
        Date.now() - error.timestamp < 5000 // 5 seconds
    );

    if (recentErrors.length > 3) {
      console.warn(`⚠️ Performance Warning: Repeated error detected`, {
        message: errorInfo.message,
        count: recentErrors.length,
      });

      // Bisa trigger performance mitigation
      this.mitigatePerformanceIssue(errorInfo);
    }
  }

  mitigatePerformanceIssue(errorInfo) {
    try {
      // Performance mitigation strategies
      if (errorInfo.type === "resource") {
        // Fallback untuk resource loading errors
        this.handleResourceError(errorInfo);
      } else if (errorInfo.type === "javascript") {
        // JavaScript error mitigation
        this.handleJavaScriptError(errorInfo);
      }
    } catch (mitigationError) {
      console.error("Error mitigation failed:", mitigationError);
    }
  }

  handleResourceError(errorInfo) {
    // Resource error mitigation
    if (errorInfo.message.includes("image") || errorInfo.element === "IMG") {
      // Image loading fallback
      console.log("🔄 Implementing image fallback strategy");

      // Could implement lazy loading retry atau fallback images
      document.querySelectorAll('img[src=""]').forEach((img) => {
        img.src = "/assets/placeholder.svg"; // Fallback image
      });
    }

    if (errorInfo.message.includes("script")) {
      // Script loading fallback
      console.log("🔄 Script loading failed, checking for alternatives");
    }
  }

  handleJavaScriptError(errorInfo) {
    // JavaScript error mitigation
    if (
      errorInfo.message.includes("fetch") ||
      errorInfo.message.includes("network")
    ) {
      // Network error handling
      console.log("🔄 Network error detected, checking offline capability");

      // Could trigger offline mode atau retry mechanism
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.active?.postMessage({
            type: "NETWORK_ERROR",
            error: errorInfo,
          });
        });
      }
    }
  }

  // API untuk manual error reporting
  reportError(error, context = {}) {
    this.handleError({
      type: "manual",
      message: error.message || error.toString(),
      error: error,
      context: context,
      timestamp: Date.now(),
    });
  }

  // Get error statistics untuk debugging
  getErrorStats() {
    const stats = {
      total: this.errors.length,
      byType: {},
      recent: this.errors.filter(
        (error) => Date.now() - error.timestamp < 60000
      ), // Last minute
    };

    this.errors.forEach((error) => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
    });

    return stats;
  }

  // Clear errors (untuk testing atau cleanup)
  clearErrors() {
    this.errors = [];
  }
}

// Singleton instance
export const performanceErrorHandler = new PerformanceErrorHandler();

// React hook untuk error handling
export const useErrorHandler = () => {
  const reportError = (error, context) => {
    performanceErrorHandler.reportError(error, context);
  };

  const getErrorStats = () => {
    return performanceErrorHandler.getErrorStats();
  };

  return { reportError, getErrorStats };
};

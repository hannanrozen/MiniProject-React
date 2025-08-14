import React, { useState, useCallback, memo } from "react";

const OptimizedImage = memo(
  ({
    src,
    alt,
    className = "",
    width,
    height,
    priority = false,
    placeholder = true,
    ...props
  }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = useCallback(() => {
      setLoaded(true);
    }, []);

    const handleError = useCallback(() => {
      setError(true);
      setLoaded(true);
    }, []);

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        {placeholder && !loaded && (
          <div
            className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"
            style={{ width, height }}
          />
        )}

        {error ? (
          <div
            className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 text-sm rounded-full"
            style={{ width, height }}
          >
            No Image
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-200 ${
              loaded ? "opacity-100" : "opacity-0"
            } ${className}`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            width={width}
            height={height}
            style={{
              aspectRatio: width && height ? `${width}/${height}` : "1/1",
              objectFit: "cover",
            }}
            {...props}
          />
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;

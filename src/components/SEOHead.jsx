import React, { useEffect } from "react";

const SEOHead = ({
  title = "Staffinity - Modern Team Management Platform",
  description = "Streamline your HR processes with comprehensive suite of tools designed for modern workplaces.",
  keywords = "HR management, team collaboration, employee tracking, performance analytics",
  ogImage = "/vite.svg",
  canonicalUrl,
  type = "website",
}) => {
  const fullTitle = title.includes("Staffinity")
    ? title
    : `${title} | Staffinity`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "Staffinity");

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:site_name", "Staffinity", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }

    // Structured Data
    let structuredData = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Staffinity",
      description: description,
      url: canonicalUrl || window.location.href,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
    });
  }, [fullTitle, description, keywords, ogImage, canonicalUrl, type]);

  return null;
};

export default SEOHead;

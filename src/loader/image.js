"use client";

export default function myImageLoader({ src, width, quality }) {
  // Set default quality to 100 for all images
  return `${src}?w=${width}&q=${quality || 100}`;
};
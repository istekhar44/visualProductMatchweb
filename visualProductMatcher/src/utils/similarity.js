// Generate random similarity score between 0 and 100 (fallback)
export const generateRandomSimilarity = () => {
  return Math.floor(Math.random() * 101);
};

// Calculate similarity scores for all products (initial load without image)
export const calculateProductSimilarities = (products) => {
  return products.map((product) => ({
    ...product,
    similarity: generateRandomSimilarity(),
  }));
};

// Filter products by similarity threshold
export const filterProductsBySimilarity = (products, minSimilarity) => {
  if (minSimilarity === 0) return products;
  return products.filter((product) => product.similarity >= minSimilarity);
};

// Sort products by similarity (descending)
export const sortProductsBySimilarity = (products) => {
  return [...products].sort(
    (a, b) => b.similarity - a.similarity
  );
};

// Add similarity scores to products (used when no image is uploaded)
export const addPlaceholderSimilarity = (products) => {
  return products.map((product) => ({
    ...product,
    similarity: 0, // No image uploaded yet
  }));
};

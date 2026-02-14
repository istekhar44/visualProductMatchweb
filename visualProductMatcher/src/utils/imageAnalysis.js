/**
 * Image Analysis Utilities for Visual Similarity Matching
 * Uses color histogram comparison to calculate similarity between images
 */

/**
 * Load an image from a URL or data URL
 * @param {string} src - Image source (URL or data URL)
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Extract color histogram from an image
 * @param {HTMLImageElement} image
 * @returns {Object} Histogram data with RGB channels
 */
export const getImageHistogram = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Resize to 100x100 for faster processing
    const size = 100;
    canvas.width = size;
    canvas.height = size;

    // Draw image on canvas
    ctx.drawImage(image, 0, 0, size, size);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    // Initialize histograms (256 bins for each RGB channel)
    const histogram = {
        r: new Array(256).fill(0),
        g: new Array(256).fill(0),
        b: new Array(256).fill(0),
    };

    // Build histogram
    for (let i = 0; i < data.length; i += 4) {
        histogram.r[data[i]]++;
        histogram.g[data[i + 1]]++;
        histogram.b[data[i + 2]]++;
    }

    // Normalize histograms
    const totalPixels = size * size;
    for (let i = 0; i < 256; i++) {
        histogram.r[i] /= totalPixels;
        histogram.g[i] /= totalPixels;
        histogram.b[i] /= totalPixels;
    }

    return histogram;
};

/**
 * Calculate similarity between two histograms using histogram intersection
 * @param {Object} hist1 - First histogram
 * @param {Object} hist2 - Second histogram
 * @returns {number} Similarity score (0-100)
 */
export const compareHistograms = (hist1, hist2) => {
    let intersection = 0;

    // Calculate intersection for each channel
    for (let i = 0; i < 256; i++) {
        intersection += Math.min(hist1.r[i], hist2.r[i]);
        intersection += Math.min(hist1.g[i], hist2.g[i]);
        intersection += Math.min(hist1.b[i], hist2.b[i]);
    }

    // Normalize to 0-100 scale (divide by 3 for RGB channels)
    const similarity = (intersection / 3) * 100;

    return Math.round(similarity);
};

/**
 * Calculate dominant colors from histogram
 * @param {Object} histogram
 * @returns {Object} Dominant color info
 */
export const getDominantColor = (histogram) => {
    let maxR = 0, maxG = 0, maxB = 0;
    let dominantR = 0, dominantG = 0, dominantB = 0;

    for (let i = 0; i < 256; i++) {
        if (histogram.r[i] > maxR) {
            maxR = histogram.r[i];
            dominantR = i;
        }
        if (histogram.g[i] > maxG) {
            maxG = histogram.g[i];
            dominantG = i;
        }
        if (histogram.b[i] > maxB) {
            maxB = histogram.b[i];
            dominantB = i;
        }
    }

    return { r: dominantR, g: dominantG, b: dominantB };
};

/**
 * Calculate similarity between uploaded image and product image
 * @param {string} uploadedImageSrc - Source of uploaded image
 * @param {string} productImageSrc - Source of product image
 * @returns {Promise<number>} Similarity score (0-100)
 */
export const calculateImageSimilarity = async (uploadedImageSrc, productImageSrc) => {
    try {
        // Load both images
        const [uploadedImg, productImg] = await Promise.all([
            loadImage(uploadedImageSrc),
            loadImage(productImageSrc),
        ]);

        // Extract histograms
        const uploadedHist = getImageHistogram(uploadedImg);
        const productHist = getImageHistogram(productImg);

        // Compare histograms
        const similarity = compareHistograms(uploadedHist, productHist);

        return similarity;
    } catch (error) {
        console.error('Error calculating similarity:', error);
        // Return low similarity on error
        return 0;
    }
};

/**
 * Calculate similarities for all products against uploaded image
 * @param {string} uploadedImageSrc - Source of uploaded image
 * @param {Array} products - Array of product objects with image URLs
 * @returns {Promise<Array>} Products with similarity scores
 */
export const calculateAllSimilarities = async (uploadedImageSrc, products) => {
    try {
        // Load uploaded image once
        const uploadedImg = await loadImage(uploadedImageSrc);
        const uploadedHist = getImageHistogram(uploadedImg);

        // Calculate similarity for each product
        const productsWithSimilarity = await Promise.all(
            products.map(async (product) => {
                try {
                    const productImg = await loadImage(product.image);
                    const productHist = getImageHistogram(productImg);
                    const similarity = compareHistograms(uploadedHist, productHist);

                    return {
                        ...product,
                        similarity,
                    };
                } catch (error) {
                    console.error(`Error processing product ${product.id}:`, error);
                    return {
                        ...product,
                        similarity: 0,
                    };
                }
            })
        );

        return productsWithSimilarity;
    } catch (error) {
        console.error('Error calculating all similarities:', error);
        // Return products with zero similarity on error
        return products.map(p => ({ ...p, similarity: 0 }));
    }
};

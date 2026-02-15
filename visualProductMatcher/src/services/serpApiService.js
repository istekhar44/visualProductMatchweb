/**
 * SerpAPI Service for Google Search and Reverse Image Search
 * Supports both text-based Google search and reverse image search
 */

import { uploadImageToImgbb, isImgbbConfigured } from './imageHostingService';

const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY;
const SERPAPI_BASE_URL = 'https://serpapi.com/search.json';

/**
 * Perform Google Search using SerpAPI
 * @param {string} query - Search query text
 * @param {Object} options - Search options (location, language, etc.)
 * @returns {Promise<Object>} - Search results with images and web results
 */
export async function googleSearch(query, options = {}) {
    try {
        // Build SerpAPI request URL
        const params = new URLSearchParams({
            engine: 'google',
            q: query,
            api_key: SERPAPI_KEY,
            tbm: 'isch', // Image search
        });

        // Add optional parameters
        if (options.location) {
            params.append('location', options.location);
        }
        if (options.hl) {
            params.append('hl', options.hl); // Language
        }
        if (options.gl) {
            params.append('gl', options.gl); // Country
        }
        if (options.google_domain) {
            params.append('google_domain', options.google_domain);
        }

        const url = `${SERPAPI_BASE_URL}?${params.toString()}`;

        // Make API request
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`SerpAPI request failed: ${response.statusText}`);
        }

        const data = await response.json();

        // Check for API errors
        if (data.error) {
            throw new Error(`SerpAPI error: ${data.error}`);
        }

        // Parse and format the results
        return parseGoogleSearchResults(data, query);
    } catch (error) {
        console.error('Error performing Google search:', error);
        throw error;
    }
}

/**
 * Parse Google Search results
 * @param {Object} data - Raw SerpAPI response
 * @param {string} query - Original search query
 * @returns {Object} - Formatted results
 */
function parseGoogleSearchResults(data, query) {
    const results = {
        similarImages: [],
        categories: [],
        searchQuery: query,
    };

    // Extract images from search results (limit to 50)
    if (data.images_results && Array.isArray(data.images_results)) {
        results.similarImages = data.images_results.slice(0, 50).map((item, index) => ({
            id: `google-${index}`,
            title: item.title || 'Untitled',
            thumbnail: item.thumbnail || item.original,
            original: item.original,
            source: item.source || item.domain || 'Unknown',
            link: item.link || item.source_url,
            position: item.position || index + 1,
        }));
    }

    // Extract categories from related searches
    if (data.related_searches && Array.isArray(data.related_searches)) {
        results.categories = data.related_searches.slice(0, 5).map(search => ({
            name: search.query || search.text,
            type: 'related',
        }));
    }

    // Add search query as primary category
    results.categories.unshift({
        name: query,
        type: 'primary',
    });

    return results;
}

/**
 * Perform reverse image search using SerpAPI
 * @param {string} imageData - Image URL or base64 data
 * @returns {Promise<Object>} - Search results with similar images and categories
 */
export async function reverseImageSearch(imageData) {
    try {
        // Get public image URL
        let imageUrl = imageData;

        // If it's not already a URL, upload to imgbb first
        if (!imageData.startsWith('http://') && !imageData.startsWith('https://')) {
            if (!isImgbbConfigured()) {
                throw new Error('Image hosting is not configured. Please add your imgbb API key to the .env file.');
            }
            imageUrl = await uploadImageToImgbb(imageData);
        }

        // Build SerpAPI request URL
        const params = new URLSearchParams({
            engine: 'google_reverse_image',
            image_url: imageUrl,
            api_key: SERPAPI_KEY,
        });

        const url = `${SERPAPI_BASE_URL}?${params.toString()}`;

        // Make API request
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`SerpAPI request failed: ${response.statusText}`);
        }

        const data = await response.json();

        // Check for API errors
        if (data.error) {
            throw new Error(`SerpAPI error: ${data.error}`);
        }

        // Parse and format the results
        return parseSearchResults(data);
    } catch (error) {
        console.error('Error performing reverse image search:', error);
        throw error;
    }
}

/**
 * Parse SerpAPI response and extract relevant data
 * @param {Object} data - Raw SerpAPI response
 * @returns {Object} - Formatted results
 */
function parseSearchResults(data) {
    const results = {
        similarImages: [],
        categories: [],
        searchQuery: '',
    };

    // Extract search query/title
    if (data.search_metadata?.google_lens_query) {
        results.searchQuery = data.search_metadata.google_lens_query;
    }

    // Extract visual matches (similar images) - limit to 50
    if (data.image_results && Array.isArray(data.image_results)) {
        results.similarImages = data.image_results.slice(0, 50).map((item, index) => ({
            id: `serp-${index}`,
            title: item.title || 'Untitled',
            thumbnail: item.thumbnail || item.original,
            original: item.original,
            source: item.source || 'Unknown',
            link: item.link,
            position: item.position || index + 1,
        }));
    }

    // Alternative: Extract inline images if image_results is not available
    if (results.similarImages.length === 0 && data.inline_images) {
        results.similarImages = data.inline_images.slice(0, 50).map((item, index) => ({
            id: `inline-${index}`,
            title: item.title || item.source || 'Similar Image',
            thumbnail: item.thumbnail || item.original,
            original: item.original,
            source: item.source || 'Unknown',
            link: item.link,
            position: index + 1,
        }));
    }

    // Extract knowledge graph categories/labels
    if (data.knowledge_graph) {
        const kg = data.knowledge_graph;

        // Add title as primary category
        if (kg.title) {
            results.categories.push({
                name: kg.title,
                type: 'primary',
            });
        }

        // Add type/category
        if (kg.type) {
            results.categories.push({
                name: kg.type,
                type: 'secondary',
            });
        }
    }

    // Extract reverse image search categories
    if (data.reverse_image_search && data.reverse_image_search.title) {
        results.categories.push({
            name: data.reverse_image_search.title,
            type: 'search',
        });
    }

    // Extract text from visual matches for additional context
    if (data.visual_matches && Array.isArray(data.visual_matches)) {
        const uniqueCategories = new Set();

        data.visual_matches.slice(0, 5).forEach(match => {
            if (match.title) {
                // Extract potential category keywords from titles
                const words = match.title.toLowerCase().split(/\s+/);
                words.forEach(word => {
                    if (word.length > 4 && !uniqueCategories.has(word)) {
                        uniqueCategories.add(word);
                    }
                });
            }
        });
    }

    return results;
}

/**
 * Check if SerpAPI is configured
 * @returns {boolean}
 */
export function isSerpApiConfigured() {
    return !!SERPAPI_KEY && SERPAPI_KEY !== 'your_serpapi_key_here';
}

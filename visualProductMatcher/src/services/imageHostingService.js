/**
 * Image Hosting Service using imgbb API
 * Uploads images to imgbb for temporary hosting to get public URLs
 */

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

/**
 * Upload an image to imgbb and get a public URL
 * @param {string} imageData - Base64 encoded image data or image URL
 * @returns {Promise<string>} - Public URL of the uploaded image
 */
export async function uploadImageToImgbb(imageData) {
    try {
        // If it's already a URL, return it directly
        if (imageData.startsWith('http://') || imageData.startsWith('https://')) {
            return imageData;
        }

        // Remove data URL prefix if present (e.g., "data:image/png;base64,")
        const base64Data = imageData.includes('base64,')
            ? imageData.split('base64,')[1]
            : imageData;

        // Create form data
        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64Data);

        // Upload to imgbb
        const response = await fetch(IMGBB_UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`imgbb upload failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error('imgbb upload failed: ' + (data.error?.message || 'Unknown error'));
        }

        // Return the public URL
        return data.data.url;
    } catch (error) {
        console.error('Error uploading image to imgbb:', error);
        throw new Error('Failed to upload image. Please try again.');
    }
}

/**
 * Check if imgbb API key is configured
 * @returns {boolean}
 */
export function isImgbbConfigured() {
    return !!IMGBB_API_KEY && IMGBB_API_KEY !== 'your_imgbb_key_here';
}

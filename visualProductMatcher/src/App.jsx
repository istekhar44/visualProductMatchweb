import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { SearchInput } from './components/SearchInput';
import { SearchModeToggle } from './components/SearchModeToggle';
import { PreviewSection } from './components/PreviewSection';
import { ProductGrid } from './components/ProductGrid';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CategoryBadges } from './components/CategoryBadges';
import { reverseImageSearch, googleSearch, isSerpApiConfigured } from './services/serpApiService';
import { sampleImages } from './data/sampleImages';

function App() {
  const [searchMode, setSearchMode] = useState('image'); // 'image' or 'text'
  const [uploadedImage, setUploadedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [similarImages, setSimilarImages] = useState(sampleImages); // Initialize with sample images
  const [categories, setCategories] = useState([
    { name: 'Explore', type: 'primary' },
    { name: 'Nature', type: 'secondary' },
    { name: 'Animals', type: 'secondary' },
    { name: 'Architecture', type: 'secondary' },
    { name: 'Food', type: 'secondary' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle image selection and perform reverse image search
  const handleImageSelect = async (image) => {
    setUploadedImage(image);
    setSearchQuery('');
    setIsLoading(true);
    setError(null);
    setSimilarImages([]);
    setCategories([]);

    try {
      // Check if API is configured
      if (!isSerpApiConfigured()) {
        throw new Error(
          'SerpAPI is not configured. Please add your API key to the .env file. Get your key from https://serpapi.com/manage-api-key'
        );
      }

      // Perform reverse image search
      const results = await reverseImageSearch(image);

      // Update state with results
      setSimilarImages(results.similarImages);
      setCategories(results.categories);

      if (results.similarImages.length === 0) {
        setError('No similar images found. Try a different image.');
      }
    } catch (err) {
      console.error('Error performing reverse image search:', err);
      setError(err.message || 'Failed to search for similar images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle text search
  const handleTextSearch = async (query) => {
    setSearchQuery(query);
    setUploadedImage(null);
    setIsLoading(true);
    setError(null);
    setSimilarImages([]);
    setCategories([]);

    try {
      // Check if API is configured
      if (!isSerpApiConfigured()) {
        throw new Error(
          'SerpAPI is not configured. Please add your API key to the .env file. Get your key from https://serpapi.com/manage-api-key'
        );
      }

      // Perform Google search
      const results = await googleSearch(query);

      // Update state with results
      setSimilarImages(results.similarImages);
      setCategories(results.categories);

      if (results.similarImages.length === 0) {
        setError('No images found for this query. Try a different search term.');
      }
    } catch (err) {
      console.error('Error performing Google search:', err);
      setError(err.message || 'Failed to search for images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clear - restore sample images
  const handleClear = () => {
    setUploadedImage(null);
    setSearchQuery('');
    setSimilarImages(sampleImages); // Restore sample images
    setCategories([
      { name: 'Explore', type: 'primary' },
      { name: 'Nature', type: 'secondary' },
      { name: 'Animals', type: 'secondary' },
      { name: 'Architecture', type: 'secondary' },
      { name: 'Food', type: 'secondary' },
    ]);
    setError(null);
  };

  // Handle mode change
  const handleModeChange = (mode) => {
    setSearchMode(mode);
    handleClear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-800">Visual Search Portal</h1>
            </div>
            <p className="text-sm text-gray-600 hidden sm:block">
              Search by image or text to find similar images
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Search Mode Toggle */}
            <SearchModeToggle mode={searchMode} onModeChange={handleModeChange} />

            {/* Conditional Input Based on Mode */}
            {searchMode === 'image' ? (
              <>
                <ImageUploader onImageSelect={handleImageSelect} />
                <PreviewSection image={uploadedImage} onClear={handleClear} />
              </>
            ) : (
              <SearchInput onSearch={handleTextSearch} />
            )}

            {/* Categories Display */}
            {categories.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {searchMode === 'image' ? 'Categories' : 'Related Searches'}
                </h3>
                <CategoryBadges categories={categories} />
              </div>
            )}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                <LoadingSpinner />
                <p className="text-center text-gray-600 mt-4">
                  {searchMode === 'image'
                    ? 'Searching for similar images...'
                    : 'Searching for images...'}
                </p>
              </div>
            ) : (
              <ProductGrid
                products={similarImages}
                isLoading={isLoading}
                error={error}
                hasUploadedImage={!!uploadedImage || !!searchQuery}
                categories={categories}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-2">Visual Search Portal</h3>
              <p className="text-sm">Search by image or text using Google's powerful search engine.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Features</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Reverse Image Search</li>
                <li>✓ Text-based Image Search</li>
                <li>✓ Category Detection</li>
                <li>✓ Related Searches</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Powered By</h3>
              <p className="text-sm">SerpAPI - Google Search API</p>
              <p className="text-sm">imgbb - Image Hosting</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Visual Search Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

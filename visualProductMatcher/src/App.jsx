import { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PreviewSection } from './components/PreviewSection';
import { FilterPanel } from './components/FilterPanel';
import { ProductGrid } from './components/ProductGrid';
import { LoadingSpinner } from './components/LoadingSpinner';
import {
  filterProductsBySimilarity,
  sortProductsBySimilarity,
  addPlaceholderSimilarity,
} from './utils/similarity';
import { calculateAllSimilarities } from './utils/imageAnalysis';
import productsData from './data/products.json';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minSimilarity, setMinSimilarity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Add placeholder similarity (0) for initial load
        const productsWithPlaceholder = addPlaceholderSimilarity(productsData);

        setProducts(productsWithPlaceholder);
        setFilteredProducts(productsWithPlaceholder);
      } catch (err) {
        setError('Failed to load products. Please refresh the page.');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle image selection and analyze similarity
  const handleImageSelect = async (image) => {
    setUploadedImage(image);
    setMinSimilarity(0);

    // Start analyzing the image
    setIsAnalyzing(true);
    setError(null);

    try {
      // Calculate real similarities using image analysis
      const productsWithSimilarity = await calculateAllSimilarities(image, productsData);

      // Sort by similarity (highest first)
      const sortedProducts = sortProductsBySimilarity(productsWithSimilarity);

      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Error analyzing image:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (threshold) => {
    setMinSimilarity(threshold);
    const filtered = filterProductsBySimilarity(products, threshold);
    setFilteredProducts(filtered);
  };

  // Handle clear image
  const handleClearImage = () => {
    setUploadedImage(null);
    // Reset to placeholder similarity
    const productsWithPlaceholder = addPlaceholderSimilarity(productsData);
    setProducts(productsWithPlaceholder);
    setFilteredProducts(productsWithPlaceholder);
    setMinSimilarity(0);
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
              <h1 className="text-2xl font-bold text-gray-800">Visual Product Matcher</h1>
            </div>
            <p className="text-sm text-gray-600 hidden sm:block">
              Upload an image to find similar products
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ImageUploader onImageSelect={handleImageSelect} />
            <PreviewSection image={uploadedImage} onClear={handleClearImage} />
            {products.length > 0 && (
              <FilterPanel
                minSimilarity={minSimilarity}
                onFilterChange={handleFilterChange}
                totalProducts={products.length}
                filteredCount={filteredProducts.length}
              />
            )}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            {isLoading || isAnalyzing ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                <LoadingSpinner />
                {isAnalyzing && (
                  <p className="text-center text-gray-600 mt-4">
                    Analyzing your image and finding similar products...
                  </p>
                )}
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                isLoading={isLoading}
                error={error}
                hasUploadedImage={!!uploadedImage}
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
              <h3 className="text-white font-semibold mb-2">Visual Product Matcher</h3>
              <p className="text-sm">Find similar products using visual matching technology.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Features</h3>
              <ul className="text-sm space-y-1">
                <li>Image Upload</li>
                <li>URL Input</li>
                <li>Smart Filtering</li>
                <li>Mobile Responsive</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Product Info</h3>
              <p className="text-sm">50+ curated products from various categories.</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Visual Product Matcher. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

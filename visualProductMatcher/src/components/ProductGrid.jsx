import { ProductCard } from './ProductCard';

export function ProductGrid({ products, isLoading, error, hasUploadedImage }) {
  if (error) {
    return (
      <div className="w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4v2m0 4v2M6.343 17.657l1.414-1.414m2.828 2.828l1.414-1.414m4.242 0l1.414 1.414m2.828-2.828l1.414 1.414M9 5h6m0-2v2m-2-4v4"
          />
        </svg>
        <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Products</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0 && !hasUploadedImage) {
    return (
      <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-xl font-bold text-blue-800 mb-2">Upload an Image to Get Started</h3>
        <p className="text-blue-700">
          Upload a product image or paste an image URL to find visually similar products.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 0120.354 15.354z"
          />
        </svg>
        <h3 className="text-lg font-bold text-amber-800 mb-2">No Products Found</h3>
        <p className="text-amber-700">
          Try lowering the similarity threshold to see more products.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Matched Products ({products.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

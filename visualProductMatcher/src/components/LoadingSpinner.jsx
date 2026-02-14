export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-12 h-12">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        {/* Spinner */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <span className="ml-3 text-gray-700 font-semibold">Loading products...</span>
    </div>
  );
}

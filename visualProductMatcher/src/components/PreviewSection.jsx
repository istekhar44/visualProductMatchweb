export function PreviewSection({ image, onClear }) {
  if (!image) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 mb-6 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-3 text-gray-400"
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
        <p className="text-gray-500 font-semibold">No image selected</p>
        <p className="text-gray-400 text-sm">Upload an image to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Your Image</h2>
        <button
          onClick={onClear}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-semibold"
        >
          Clear
        </button>
      </div>
      <div className="flex justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={image}
          alt="Preview"
          className="max-w-full max-h-96 object-contain"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3EImage Load Failed%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
    </div>
  );
}

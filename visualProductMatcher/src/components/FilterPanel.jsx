export function FilterPanel({ minSimilarity, onFilterChange, totalProducts, filteredCount }) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filter by Similarity</h2>

      <div className="space-y-4">
        {/* Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-700 font-semibold">Minimum Similarity Score</label>
            <span className="text-xl font-bold text-blue-600">{minSimilarity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={minSimilarity}
            onChange={(e) => onFilterChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Quick buttons */}
        <div className="flex flex-wrap gap-2">
          {[0, 25, 50, 75].map((threshold) => (
            <button
              key={threshold}
              onClick={() => onFilterChange(threshold)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                minSimilarity === threshold
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {threshold}%+
            </button>
          ))}
        </div>

        {/* Results info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
          <p className="text-gray-700">
            Showing <span className="font-bold text-blue-600">{filteredCount}</span> of{' '}
            <span className="font-bold text-gray-800">{totalProducts}</span> products
          </p>
        </div>
      </div>
    </div>
  );
}

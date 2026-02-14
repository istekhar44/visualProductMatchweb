export function ProductCard({ product }) {
  const similarity = product.similarity;
  
  // Determine color based on similarity score
  const getSimilarityColor = (score) => {
    if (score >= 75) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (score >= 25) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3EImage unavailable%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* Similarity Badge */}
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full font-bold text-sm border ${getSimilarityColor(similarity)}`}>
          {similarity}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-800 line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>

        {/* Similarity Bar */}
        <div className="mb-3 flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                similarity >= 75
                  ? 'bg-green-500'
                  : similarity >= 50
                  ? 'bg-yellow-500'
                  : similarity >= 25
                  ? 'bg-orange-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${similarity}%` }}
            ></div>
          </div>
        </div>

        {/* Price */}
        <div className="text-lg font-bold text-blue-600">{product.price}</div>
      </div>
    </div>
  );
}

/**
 * CategoryBadges Component
 * Displays image categories/labels as visual badges
 */

export function CategoryBadges({ categories }) {
    if (!categories || categories.length === 0) {
        return null;
    }

    const getBadgeColor = (type) => {
        switch (type) {
            case 'primary':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'secondary':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'search':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'related':
                return 'bg-orange-100 text-orange-800 border-orange-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
                <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${getBadgeColor(
                        category.type
                    )}`}
                >
                    {category.name}
                </span>
            ))}
        </div>
    );
}

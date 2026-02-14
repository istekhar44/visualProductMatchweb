# Visual Product Matcher

A modern React + Tailwind CSS web application for matching products based on visual similarity. Upload an image and get matched products with similarity scores.

## Features

✨ **Core Features:**
- 📤 Image upload via file selection
- 🔗 Image URL input support
- 👁️ Real-time image preview
- 📊 Random similarity score assignment (0-100%)
- 🎯 Advanced filtering by similarity threshold
- 📱 Fully responsive mobile-first design
- ⚡ Fast loading with Vite
- 🚀 Production-ready code

## Technology Stack

- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **JavaScript (ES6+)** - Modern JavaScript

## Project Structure

```
src/
├── components/           # React components
│   ├── FilterPanel.jsx      # Similarity filter controls
│   ├── ImageUploader.jsx    # File upload & URL input
│   ├── LoadingSpinner.jsx   # Loading state indicator
│   ├── PreviewSection.jsx   # Image preview display
│   ├── ProductCard.jsx      # Individual product card
│   └── ProductGrid.jsx      # Product grid layout
├── data/
│   └── products.json     # 50 product dataset
├── utils/
│   └── similarity.js     # Similarity calculation utilities
├── App.jsx              # Main app component
├── App.css              # Global styles
├── index.css            # Imported Tailwind
└── main.jsx             # React entry point
```

## Installation & Development

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd visualProductMatcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Usage

1. **Upload an Image:**
   - Click the "Upload File" tab
   - Drag and drop or click to select an image
   - Supports PNG, JPG, GIF formats

2. **Or Paste Image URL:**
   - Click the "Paste URL" tab
   - Enter a valid image URL
   - Click "Load Image"

3. **View Results:**
   - Products are automatically matched with random similarity scores
   - Similarity scores range from 0-100%
   - Products are sorted by similarity (highest first)

4. **Filter Results:**
   - Use the similarity slider to adjust the threshold
   - Quick filter buttons: 0%+, 25%+, 50%+, 75%+
   - View matching product count in real-time

## Dataset

The app includes 50 tech and accessories products across categories:
- Electronics (Headphones, Keyboards, Webcams, etc.)
- Audio Equipment (Microphones, Speakers, Interfaces)
- Accessories (Cables, Stands, Organizers)
- Furniture & Lighting
- Storage & Wearables

Each product includes:
- ID, Name, Category
- Product image URL
- Price

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy from project directory
vercel
```

### Option 2: Using GitHub Integration

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

### Option 3: Manual Upload

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to Vercel using the web interface

## Configuration Files

- **vercel.json** - Vercel deployment configuration
- **vite.config.js** - Vite build configuration with Tailwind plugin
- **tailwindcss.config.js** - Implicit Tailwind v4 config (uses defaults)
- **.gitignore** - Files to exclude from version control
- **eslint.config.js** - Code quality standards

## Build Output

Production build creates optimized files in the `dist/` folder:
- Minified JavaScript
- Compressed CSS with purged unused styles
- Optimized HTML
- Asset optimization

## Performance Optimizations

- ✅ Image lazy loading with error fallbacks
- ✅ CSS purging via Tailwind (production)
- ✅ Code splitting with Vite
- ✅ Modern browser targeting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using React + Tailwind CSS**

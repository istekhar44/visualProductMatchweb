# Visual Search Portal

A powerful web application that combines reverse image search and text-based image search using Google's search engine via SerpAPI.

## Features

- 🔍 **Dual Search Modes**: Toggle between image search and text search
- 🖼️ **Reverse Image Search**: Upload images or paste URLs to find visually similar images
- 📝 **Text Search**: Search for images using text queries
- 🌐 **Internet-wide Results**: Find images from across the web
- 🏷️ **Smart Categories**: Automatic category detection and related searches
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Quick Start

### 1. Get API Keys

#### SerpAPI Key (Required)
1. Visit [serpapi.com](https://serpapi.com/)
2. Sign up for a free account
3. Get your API key from [https://serpapi.com/manage-api-key](https://serpapi.com/manage-api-key)
4. Free tier includes 100 searches/month

#### imgbb API Key (Required for image uploads)
1. Visit [imgbb.com](https://imgbb.com/)
2. Sign up for a free account
3. Get your API key from [https://api.imgbb.com/](https://api.imgbb.com/)
4. Free tier available

### 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys:
   ```bash
   VITE_SERPAPI_KEY=your_actual_serpapi_key_here
   VITE_IMGBB_API_KEY=your_actual_imgbb_key_here
   ```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

## How to Use

### Image Search Mode

1. Click the **"Image Search"** button (default mode)
2. Choose your input method:
   - **Upload File**: Click to select an image from your device
   - **Paste URL**: Switch to URL mode and paste an image URL
3. View similar images and categories
4. Click any result to visit the source

### Text Search Mode

1. Click the **"Text Search"** button
2. Enter your search query (e.g., "Coffee", "Mountains", "Technology")
3. Click "Search Images" or press Enter
4. View image results and related searches
5. Click any result to visit the source

## How It Works

### Image Search
1. Local images are uploaded to imgbb for temporary hosting
2. The public URL is sent to SerpAPI's Google Reverse Image Search
3. Similar images from across the internet are returned
4. Categories are extracted from search metadata

### Text Search
1. Search query is sent to SerpAPI's Google Search API
2. Image results are returned from Google's image search
3. Related searches are extracted as categories
4. Results are displayed in a responsive grid

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via index.css)
- **SerpAPI** - Google Search and Reverse Image Search API
- **imgbb** - Temporary image hosting service

## Troubleshooting

### "SerpAPI is not configured" Error
- Make sure you've added your SerpAPI key to the `.env` file
- Restart the dev server after adding the key

### "Failed to upload image" Error
- Check that your imgbb API key is correct in the `.env` file
- Ensure the image file is a valid format (PNG, JPG, GIF)

### No Results Found
- **Image Search**: Try a different image with more distinctive features
- **Text Search**: Try different search terms or be more specific
- Check that your SerpAPI account has remaining credits

### Images Not Loading
- Some image URLs may be blocked by CORS or no longer available
- The fallback "No Image" placeholder will be shown

## API Rate Limits

- **SerpAPI Free Tier**: 100 searches/month
- **imgbb Free Tier**: Check their current limits

Monitor your usage to avoid hitting rate limits.

## Project Structure

```
src/
├── components/
│   ├── ImageUploader.jsx       # Image upload/URL input
│   ├── SearchInput.jsx          # Text search input
│   ├── SearchModeToggle.jsx     # Toggle between modes
│   ├── PreviewSection.jsx       # Image preview
│   ├── ProductGrid.jsx          # Results display
│   ├── CategoryBadges.jsx       # Category badges
│   └── LoadingSpinner.jsx       # Loading indicator
├── services/
│   ├── serpApiService.js        # SerpAPI integration
│   └── imageHostingService.js   # imgbb integration
└── App.jsx                      # Main application
```

## License

© 2026 Visual Search Portal. All rights reserved.

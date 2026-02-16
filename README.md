# Visual Product Matcher 

A full-stack web application that performs reverse image search using the Bing Visual Search API. Users can upload images or provide image URLs to find visually similar images from across the internet.

![Reverse Image Search](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

## How It's Built

### 1. **Frontend Architecture**

```
React (UI) → Vite (Build) → Vercel (Deploy)
```

**Technology Stack:**
- **React 18**: Modern functional components with hooks
- **Vite**: Lightning-fast build tool and dev server
- **Vanilla CSS**: Lightweight styling without framework overhead
- **Component-Based**: Modular, reusable UI components

### 2. **Core Components**

```
App.jsx (Main Controller)
├── SearchModeToggle.jsx        → Switch between image/text search
├── ImageUploader.jsx           → Handle file uploads & URL input
├── SearchInput.jsx             → Text search input field
├── PreviewSection.jsx          → Display uploaded image
├── ProductGrid.jsx             → Results grid layout
├── CategoryBadges.jsx          → Show categories/tags
└── LoadingSpinner.jsx          → Loading indicator
```

### 3. **Service Layer**

**API Integration Services:**

```javascript
// serpApiService.js
- reverseImageSearch(imageData)  → Google reverse image search
- googleSearch(query)            → Google text-based image search
- parseSearchResults(data)       → Format API responses

// imageHostingService.js
- uploadImageToImgbb(base64)     → Upload local images to public host
```

### 4. **Data Flow**

#### **Image Search Flow:**
```
User uploads image
    ↓
Upload to imgbb (get public URL)
    ↓
Send URL to SerpAPI
    ↓
Google Reverse Image Search
    ↓
Parse & display results (max 50 images)
```

#### **Text Search Flow:**
```
User enters search query
    ↓
Send query to SerpAPI
    ↓
Google Image Search
    ↓
Parse & display results (max 50 images)
```

### 5. **State Management**

**React Hooks-Based State:**

```javascript
useState('image')           // Search mode: 'image' or 'text'
useState(null)              // Uploaded image data
useState('')                // Search query text
useState([])                // Search results array
useState([])                // Categories/tags
useState(false)             // Loading state
useState(null)              // Error messages
```

**State flows unidirectionally:**
User Action → State Update → Component Re-render → UI Update

### 6. **API Integration**

**External Services:**

| Service | Purpose | Usage |
|---------|---------|-------|
| **SerpAPI** | Google Search API | Reverse image search & text search |
| **imgbb** | Image Hosting | Convert local images to public URLs |

**API Keys Configuration:**
```bash
VITE_SERPAPI_KEY= Enter the api key
VITE_IMGBB_API_KEY= Enter the api key
```

### 7. **Build Process**

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)

# Production
npm run build        # Create optimized build
npm run preview      # Test production build locally
```

**Vite Optimizations:**
- Tree-shaking (remove unused code)
- Code splitting (lazy load components)
- CSS minification
- Asset optimization
- Fast Hot Module Replacement (HMR)

### 8. **Deployment Strategy**

```
GitHub Repository
    ↓
Vercel (Auto-deploy on push)
    ↓
Production URL (live application)
```

**Deployment Features:**
- Automatic deployments on git push
- Preview deployments for pull requests
- Environment variables managed in Vercel dashboard
- Edge network for fast global access

---

## Key Design Decisions

### **1. Why React?**
- Component reusability
- Efficient re-rendering with Virtual DOM
- Large ecosystem and community support
- Modern hooks API for clean state management

### **2. Why Vite?**
- 10-100x faster than traditional bundlers
- Instant server start
- Lightning-fast HMR
- Optimized production builds

### **3. Why SerpAPI?**
- Direct access to Google's search capabilities
- No need to build custom search engine
- Reliable, production-ready API
- Simple integration

### **4. Why imgbb?**
- Free tier available
- Simple API (no complex authentication)
- Reliable uptime
- Perfect for temporary image hosting

### **5. Why Vanilla CSS?**
- No framework overhead
- Full control over styling
- Smaller bundle size
- Faster load times

---

## How Features Work

### **Dual Search Modes**

**Toggle Implementation:**
```javascript
const [searchMode, setSearchMode] = useState('image');

// Switch modes
const handleModeChange = (mode) => {
  setSearchMode(mode);
  // Clear previous results
};
```

**Conditional Rendering:**
```javascript
{searchMode === 'image' ? (
  <ImageUploader onImageSelect={handleImageSelect} />
) : (
  <SearchInput onSearch={handleTextSearch} />
)}
```

### **Image Upload & Preview**

**File Upload:**
```javascript
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    setUploadedImage(e.target.result); // Base64 data
  };
  reader.readAsDataURL(file);
};
```

**URL Input:**
```javascript
const handleUrlInput = (url) => {
  if (isValidUrl(url)) {
    setUploadedImage(url); // Direct URL
  }
};
```

### **Search Execution**

**Image Search:**
```javascript
const handleImageSelect = async (image) => {
  setIsLoading(true);
  try {
    const results = await reverseImageSearch(image);
    setSimilarImages(results.similarImages);
    setCategories(results.categories);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

**Text Search:**
```javascript
const handleTextSearch = async (query) => {
  setIsLoading(true);
  try {
    const results = await googleSearch(query);
    setSimilarImages(results.similarImages);
    setCategories(results.categories);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### **Results Display**

**Responsive Grid:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Responsive breakpoints */
@media (max-width: 640px)  { /* 1 column */ }
@media (min-width: 1024px) { /* 3 columns */ }
@media (min-width: 1280px) { /* 4 columns */ }
```

---

## Error Handling

**Multi-Layer Approach:**

1. **Configuration Check**: Verify API keys before requests
2. **Network Errors**: Catch fetch failures, show retry option
3. **API Errors**: Parse SerpAPI error responses
4. **Image Load Errors**: Fallback to placeholder images
5. **User Feedback**: Clear error messages with actionable steps

```javascript
try {
  if (!isSerpApiConfigured()) {
    throw new Error('SerpAPI not configured. Add key to .env');
  }
  const results = await reverseImageSearch(image);
} catch (error) {
  setError(error.message);
  console.error('Search failed:', error);
}
```

---

## Performance Optimizations

1. **Code Splitting**: Components loaded on demand
2. **Lazy Loading**: Images load as they enter viewport
3. **Debouncing**: Prevent excessive API calls
4. **Caching**: Browser caches API responses
5. **Minification**: CSS and JS compressed in production
6. **Tree Shaking**: Unused code removed from bundle

---

## Security Considerations

**API Key Management:**
- Keys stored in `.env` (not committed to git)
- `.gitignore` prevents accidental exposure
- Frontend keys acceptable for this use case
- For production: Consider backend proxy

**Image Privacy:**
- Uploaded images become publicly accessible
- Users warned about public hosting
- No user authentication or image ownership
- Suitable for public/non-sensitive images only

---

## Development Workflow

```bash
# 1. Setup
git clone <repo>
cd visualProductMatcher
npm install

# 2. Configure
cp .env.example .env
# Edit .env with your API keys

# 3. Develop
npm run dev
# Open http://localhost:5173

# 4. Build & Test
npm run build
npm run preview

# 5. Deploy
git push origin main
# Vercel auto-deploys
```

##  Project Structure

```
visualProductMatcher/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variables template
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImageUpload.jsx      # Drag & drop upload
│   │   │   ├── UrlInput.jsx         # URL input component
│   │   │   ├── LoadingSpinner.jsx   # Loading animation
│   │   │   ├── ErrorMessage.jsx     # Error display
│   │   │   └── ResultsGrid.jsx      # Results display
│   │   ├── App.jsx          # Main application
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```



### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

### Getting a Bing Visual Search API Key

1. Go to [Azure Portal](https://portal.azure.com/)
2. Create a new resource → Search for "Bing Search v7"
3. Subscribe to the service (Free tier available)
4. Copy your API key from the "Keys and Endpoint" section
5. Add it to your `.env` file

##  API Documentation

### Endpoint: `POST /search`

Search for visually similar images.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `file` (optional): Image file
  - `image_url` (optional): Image URL string

**Response:**
```json
{
  "results": [
    {
      "title": "Product Name",
      "image": "https://example.com/image.jpg",
      "source": "example.com",
      "link": "https://example.com/product"
    }
  ],
  "count": 50
}
```

**Error Response:**
```json
{
  "detail": "Error message"
}
```

##  Deployment

### Backend Deployment (Render/Railway)

1. **Create a new Web Service**
2. **Connect your repository**
3. **Configure build settings:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Add environment variables:**
   - `BING_API_KEY`: Your Bing API key
5. **Deploy!**

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```

3. **Update API URL in App.jsx**
   ```javascript
   const API_URL = 'https://your-backend-url.com';
   ```

4. **Build and deploy**
   ```bash
   vercel --prod
   ```

##  Usage

1. **Choose your search method:**
   - Click "Upload Image" to drag & drop or browse for an image
   - Click "Image URL" to paste an image link

2. **Preview your image**
   - The image will be displayed before searching

3. **Click "Search Similar Images"**
   - Wait for the API to process (usually 2-5 seconds)

4. **Browse results**
   - View 50 similar images in a responsive grid
   - Click "Visit Page" to see the original source

5. **Reset and search again**
   - Click "Reset" to start a new search

## 🔧 Configuration

### CORS Settings (Backend)

Update `main.py` to restrict origins in production:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API URL (Frontend)

Update `App.jsx` for production:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

Add to `.env.local`:
```
VITE_API_URL=https://your-backend-url.com
```

##  Visuals 
<img width="1893" height="911" alt="Screenshot 2026-02-15 130426" src="https://github.com/user-attachments/assets/3699bd2f-9c22-4324-85a4-cfe6c62a8251" />
<img width="1895" height="907" alt="Screenshot 2026-02-15 130453" src="https://github.com/user-attachments/assets/dffe7c85-4ee5-4387-964d-e3f983e1610a" />
<img width="1886" height="914" alt="Screenshot 2026-02-15 130519" src="https://github.com/user-attachments/assets/cd804aec-ff58-416e-b5c6-8986acccc978" />




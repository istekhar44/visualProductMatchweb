# Visual Product Matcher 

A full-stack web application that performs reverse image search using the Bing Visual Search API. Users can upload images or provide image URLs to find visually similar images from across the internet.

![Reverse Image Search](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

##  Features

- Drag & Drop Upload: Intuitive drag-and-drop interface for image uploads
- URL Support: Search using image URLs from the web
- Image Preview: Preview images before searching
- 50 Results: Get up to 50 visually similar images
- Responsive Design: Works seamlessly on desktop, tablet, and mobile
- Fast & Efficient: Optimized API integration with Bing Visual Search
- Modern UI: Beautiful gradient design with Tailwind CSS
- Real-time Feedback: Loading states and error handling

## Tejchnologies used 

### Frontend
- React 18.3 - UI framework
- Vite - Build tool and dev server
- Tailwind CSS - Styling
- Axios - HTTP client


### Backend
- Python 3.8+
- FastAPI - Modern web framework
- Uvicorn - ASGI server
- Bing Visual Search API - Image search engine
- Pillow - Image validation

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




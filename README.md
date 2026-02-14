# Internet Reverse Image Search Engine

A full-stack web application that performs reverse image search using the Bing Visual Search API. Users can upload images or provide image URLs to find visually similar images from across the internet.

![Reverse Image Search](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

## ✨ Features

- 📤 **Drag & Drop Upload**: Intuitive drag-and-drop interface for image uploads
- 🔗 **URL Support**: Search using image URLs from the web
- 🖼️ **Image Preview**: Preview images before searching
- 🎯 **50 Results**: Get up to 50 visually similar images
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Efficient**: Optimized API integration with Bing Visual Search
- 🎨 **Modern UI**: Beautiful gradient design with Tailwind CSS
- 🔄 **Real-time Feedback**: Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Dropzone** - Drag & drop functionality

### Backend
- **Python 3.8+**
- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **Bing Visual Search API** - Image search engine
- **Pillow** - Image validation

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.8+
- **Bing Visual Search API Key** from [Azure Portal](https://portal.azure.com/)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your Bing API key
   BING_API_KEY=your_actual_api_key_here
   ```

5. **Run the backend server**
   ```bash
   uvicorn main:app --reload
   ```
   
   Backend will run on `http://localhost:8000`

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

## 📡 API Documentation

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

## 🌐 Deployment

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

## 🎯 Usage

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

## 🐛 Troubleshooting

### Backend Issues

**Error: "API key not configured"**
- Make sure `.env` file exists in backend directory
- Verify `BING_API_KEY` is set correctly

**Error: "API request failed"**
- Check your Bing API subscription status
- Verify you haven't exceeded rate limits

### Frontend Issues

**Error: "Cannot connect to the server"**
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in backend

**Images not loading**
- Some image URLs may be blocked by CORS
- Try uploading the image file instead

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, FastAPI, and Bing Visual Search API**

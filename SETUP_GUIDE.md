# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Get Your Bing API Key

1. Visit [Azure Portal](https://portal.azure.com/)
2. Sign in or create a free account
3. Click "Create a resource"
4. Search for "Bing Search v7"
5. Click "Create" and follow the prompts
6. Once created, go to "Keys and Endpoint"
7. Copy one of the API keys

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Open .env file and add your API key
# Edit the line: BING_API_KEY=your_key_here
```

### Step 3: Setup Frontend

```bash
# Open a NEW terminal
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

### Step 4: Run the Application

**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate  # Windows
uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Step 5: Open in Browser

Visit: `http://localhost:5173`

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:5173
- [ ] Can upload an image
- [ ] Can enter an image URL
- [ ] Search returns results
- [ ] Results display correctly
- [ ] Can click on result links

## 🐛 Common Issues

**"Cannot connect to server"**
- Make sure backend is running on port 8000
- Check that .env file has valid API key

**"API key not configured"**
- Open backend/.env
- Add your Bing API key

**"No module named 'fastapi'"**
- Activate virtual environment
- Run: pip install -r requirements.txt

**Frontend won't start**
- Delete node_modules folder
- Run: npm install again

## 📝 Test Images

Try these sample image URLs:
- https://images.unsplash.com/photo-1542291026-7eec264c27ff (Nike shoe)
- https://images.unsplash.com/photo-1505740420928-5e560c06d30e (Headphones)
- https://images.unsplash.com/photo-1523275335684-37898b6baf30 (Watch)

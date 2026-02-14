import { useState } from 'react';

export function ImageUploader({ onImageSelect }) {
  const [mode, setMode] = useState('upload'); // 'upload' or 'url'
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setError('');
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelect(event.target.result);
      };
      reader.onerror = () => {
        setError('Failed to read file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Validate URL format
    try {
      new URL(urlInput);
      setError('');
      onImageSelect(urlInput);
      setUrlInput('');
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com/image.jpg)');
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload or Paste Image</h2>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setMode('upload');
            setError('');
          }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => {
            setMode('url');
            setError('');
          }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'url'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Paste URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer block">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-400"
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
            <p className="text-gray-600 font-semibold">Click to upload or drag and drop</p>
            <p className="text-gray-400 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
          </label>
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUrlSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Load Image
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}

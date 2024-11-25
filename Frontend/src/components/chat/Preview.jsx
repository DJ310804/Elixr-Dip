import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChatPreview = () => {
  const [preferences, setPreferences] = useState({
    location: '',
    language: '',
    videoEnabled: true
  });

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Hindi', 'Arabic'
  ];


  

  const handleStartChat = (e) => {
    e.preventDefault();
    // Handle chat initiation logic here
    console.log('Starting chat with preferences:', preferences);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Chat Preferences
        </h1>

        <form onSubmit={handleStartChat} className="space-y-6">
          {/* Location Section */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Location</span>
            </label>
            <input
              type="text"
              placeholder="Enter your location"
              className="input input-bordered w-full"
              value={preferences.location}
              onChange={(e) => setPreferences({...preferences, location: e.target.value})}
            />
          </div>

          {/* Language Section */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Preferred Language</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={preferences.language}
              onChange={(e) => setPreferences({...preferences, language: e.target.value})}
            >
              <option value="">Select a language</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

        

          {/* Video Toggle */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-medium">Enable Video Chat</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={preferences.videoEnabled}
                onChange={(e) => setPreferences({...preferences, videoEnabled: e.target.checked})}
              />
            </label>
          </div>

          {/* Submit Button */}
          <Link to={"/chat"}>
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"  
          >
            Start Chatting
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ChatPreview;
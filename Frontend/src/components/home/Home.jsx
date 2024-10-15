import React, { useState } from 'react';
import { Video, Coffee, Send } from 'lucide-react';


const HomePage = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Question of the Day */}
      <div className="card bg-primary text-primary-content mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl">Question of the Day</h2>
          <p className="text-xl">What's your favorite way to relax after a long day?</p>
        </div>
      </div>

      {/* Comment Section */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Community Thoughts</h2>
          <div className="space-y-4 mb-4">
            {comments.map((c, index) => (
              <div key={index} className="bg-base-200 p-3 rounded-lg">
                {c}
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Share your thoughts..."
              className="input input-bordered flex-grow"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="btn btn-circle btn-primary">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Video Call Options */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="card bg-base-100 shadow-xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Video Call for Purpose</h2>
            <p>Start a focused video call for work or study.</p>
            <div className="card-actions">
              <button className="btn btn-primary mt-4">
                <Video size={20} className="mr-2" /> Start Call
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Video Call for Chill</h2>
            <p>Start a relaxed video call with friends.</p>
            <div className="card-actions">
              <button className="btn btn-secondary mt-4">
                <Coffee size={20} className="mr-2" /> Start Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
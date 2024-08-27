import React from 'react';

const Options = ({ onStartScreenShare, onToggleAudio, onToggleVideo, isAudioEnabled, isVideoEnabled }) => {
  const startCall = async () => {
    try {
      // Placeholder: Replace with your WebRTC setup logic
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // You may need to handle the stream or call logic here
      console.log('Call started');
    } catch (error) {
      console.error('Error starting call:', error);
      // Handle the specific error here
      if (error.name === 'NotFoundError') {
        alert('Camera or microphone not found. Please ensure they are connected and try again.');
      } else if (error.name === 'NotAllowedError') {
        alert('Permission denied. Please allow camera and microphone access.');
      } else if (error.name === 'NotReadableError') {
        alert('Camera or microphone is already in use. Please close other applications that might be using them.');
      } else {
        alert('An unexpected error occurred: ' + error.message);
      }
    }
  };

  const endCall = () => {
    // End call logic
    console.log('Call ended');
  };

  const handleStartScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      
      // Update the local stream with screen sharing
      console.log('Screen sharing started');
    } catch (error) {
      console.error('Error sharing screen:', error);
      // Handle the specific error here
      alert('An unexpected error occurred while sharing the screen: ' + error.message);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center mb-8">
      <button
        className="btn m-2"
        onClick={startCall}
      >
        Start Call
      </button>
      <button
        className="btn m-2"
        onClick={endCall}
      >
        End Call
      </button>
      <button
        className="btn m-2"
        onClick={handleStartScreenShare}
      >
        Share Screen
      </button>
    </div>
  );
};

export default Options;

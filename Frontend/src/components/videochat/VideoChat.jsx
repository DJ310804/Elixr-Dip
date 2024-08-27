import React, { useState,useRef,useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Options from './Options';
import ChatArea from '../chat/chatarea/ChatArea';
import Messages from '../chat/messages/Messages';

const VideoChat = () => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleStartScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }

      setIsScreenSharing(true);

      // Handle screenshare stop
      screenStream.getTracks().forEach(track => {
        track.onended = () => {
          setIsScreenSharing(false);
          startStream(); // Resume local media stream when screenshare stops
        };
      });
    } catch (error) {
      console.error('Error accessing display media:', error);
    }
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const videoRef = useRef(null);

  useEffect(() => {
    startStream();
  }, []);

  return (
    <div className="relative min-h-screen bg-base flex">
      {/* Video Stream and Options */}
      <div className="w-3/4 flex flex-col items-center justify-center">
        <VideoPlayer ref={videoRef} />
        <Options onStartScreenShare={handleStartScreenShare} />
      </div>

      {/* Right Side - Messages and Chat */}
      <div className="w-1/4 flex flex-col border-l border-gray-300">
        {/* Messages - Takes up most of the space */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Messages />
        </div>
        
        {/* Chat Area - Positioned at the bottom */}
        <div className="p-4">
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;

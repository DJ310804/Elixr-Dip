import React, { useRef, useEffect } from 'react';

const VideoPlayer = React.forwardRef((props, ref) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startStream = async () => {
      try {
        // Request user media (video and audio)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        // Assign the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Set the stream reference if provided
        if (ref) {
          ref.current = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
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

    startStream();

    // Clean up the stream on component unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [ref]);

  return (
    <div className="relative w-full max-w-4xl mb-8">
      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg shadow-lg bg-base"
        autoPlay
        playsInline
        muted // Optionally mute the local video
      />
    </div>
  );
});

export default VideoPlayer;

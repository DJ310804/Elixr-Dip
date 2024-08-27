// src/components/chat/Message.jsx
import React from 'react';

const Message = ({ content, sender }) => {
  const isSender = sender === 'me';

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 shadow rounded-lg ${
          isSender ? 'bg-blue-500 text-white' : 'bg-white'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default Message;

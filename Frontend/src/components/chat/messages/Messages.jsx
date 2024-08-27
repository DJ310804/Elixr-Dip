import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-base text-base">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat ${message.sender === 'me' ? 'chat-end' : 'chat-start'}`}
        >
          <div className={`chat-bubble ${message.sender === 'me' ? 'bg-primary text-primary-content' : 'bg-base-content text-base-content'}`}>
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;

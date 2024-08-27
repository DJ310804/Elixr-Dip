// src/components/chat/ChatArea.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../features/chat/ChatSlice';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (message.trim()) {
      dispatch(addMessage({ content: message, sender: 'me' }));
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-4 shadow">
      <button className="p-2 bg-base rounded-full">
        <AiOutlinePaperClip className="text-xl text-base" />
      </button>
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 mx-4 p-2 rounded-full bg-base focus"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button className="p-2 rounded-full border-b border-gray-300" onClick={sendMessage}>
        <FiSend className="text-xl" />
      </button>
    </div>
  );
};

export default ChatArea;

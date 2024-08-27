// src/components/chat/Chat.jsx
import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Messages from './messages/Messages';
import ChatArea from './chatarea/ChatArea';

const Chat = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header with ThemeToggler */}
        <Header />

        {/* Messages */}
        <Messages />

        {/* Chat Input Area */}
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;

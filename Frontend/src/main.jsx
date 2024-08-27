import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { store } from './app/store.js';
import Blogs from './components/blogs/Blogs.jsx';
import AddBlogs from './components/blogs/AddBlogs.jsx';
import Chat from './components/chat/Chat.jsx';
import Layout from './components/Layout.jsx';
import BlogPage from './components/blogs/BlogPage.jsx';
import VideoChat from './components/videochat/VideoChat.jsx';

const Root = () => {
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    // Apply the theme immediately when the app starts
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/blogs" element={<><AddBlogs /><Blogs /></>} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Route>
        <Route path="/chat" element={<Chat />} />
        <Route path="/video-chat" element={<VideoChat />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Root />
  </Provider>
);

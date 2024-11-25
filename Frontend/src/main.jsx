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
import LoginPage from './components/login/Login.jsx';
import Home from './components/home/Home.jsx';
import RegistrationPage from './components/Register.jsx';
import ConnectionPage from './components/connection/connectionPage.jsx';
import { AuthProvider } from './components/context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/connection" element={<ProtectedRoute><ConnectionPage /></ProtectedRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/addBlog" element={<ProtectedRoute><AddBlogs/></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
        <Route path="/video-chat" element={<ProtectedRoute><VideoChat /></ProtectedRoute>} />
      </Route>
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </Provider>
);

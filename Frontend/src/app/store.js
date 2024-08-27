import { configureStore } from '@reduxjs/toolkit';
import blogSlice from '../features/blogs/blogSlice';
import themeSlice from '../features/theme/themeSlice';
import ChatSlice from '../features/chat/ChatSlice';

export const store = configureStore({
  reducer: {
    blogs: blogSlice,
    theme: themeSlice,
    chat: ChatSlice,
  },
});

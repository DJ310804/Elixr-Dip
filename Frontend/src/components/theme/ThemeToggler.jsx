// src/theme/ThemeToggler.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../features/theme/themeSlice';

const themes = ["light", "dark", "cupcake", "retro", "synthwave", "valentine", "cyberpunk"];

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  return (
    <div
      className='fixed bottom-4 right-4 flex flex-col space-y-2 bg-white border rounded-lg shadow-md p-2'
      style={{ zIndex: 2000 }} // Ensures the ThemeToggler is above all other elements
    >
      {themes.map((theme) => (
        <button
          key={theme}
          onClick={() => handleThemeChange(theme)}
          className={`px-3 py-1 text-sm font-medium ${
            currentTheme === theme
              ? 'bg-blue-700 text-white'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          } rounded-md`}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggler;

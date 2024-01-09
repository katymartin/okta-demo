// ThemeProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Initial theme

  useEffect(() => {
    // Your theme toggle logic goes here
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      toggleTheme(storedTheme);
    }
  }, []);

  const themes = {
    light: 'src/stories/css/okta-light-stories.css',
    dark: 'src/stories/css/auth0-dark-stories.css',
  };

  const toggleTheme = (mode) => {
    const link = document.querySelector('link[data-theme="custom-theme"]');
    if (link) {
      link.href = themes[mode];
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.href = themes[mode];
      newLink.dataset.theme = 'custom-theme';
      document.head.appendChild(newLink);
    }
  };

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    toggleTheme(newTheme);
    document.dispatchEvent(new CustomEvent('theme-toggle', { detail: { args: [newTheme] } }));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

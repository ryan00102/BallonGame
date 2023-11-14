import React, { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';

const ThemeContext = createContext({});

const ThemeProviders = ({children}) => {
  const LocalTheme = window.localStorage.getItem('theme') || 'light';
  const [ThemeMode, setThemeMode] = useState(LocalTheme);
  const themeObject = ThemeMode === 'light' ? lightTheme : darkTheme;

  return(
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>
        { children }
      </StyledProvider>      
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (ThemeMode === "light") {
      setThemeMode("dark");
      window.localStorage.setItem('theme', 'dark');
    }
    else {
      setThemeMode("light")
      window.localStorage.setItem('theme', 'light');
    };
  }, [ThemeMode, setThemeMode]);
  
  return [ ThemeMode, toggleTheme];
}

export { ThemeProviders, useTheme };

export default ThemeProviders;
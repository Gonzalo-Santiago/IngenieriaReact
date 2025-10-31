import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext'; // Importamos el contexto
import {Sun, Moon} from 'lucide-react'

const ThemeSwitcher = () => {
  // 3. Usamos el hook useContext para consumir el contexto
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-switcher">
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitcher;
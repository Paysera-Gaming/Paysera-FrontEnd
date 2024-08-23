import React, { useState, useEffect } from 'react';
import SheetComponent from '../SheetComponent';
import AccountInfo from './AccountInfo';
import PasswordChange from './PasswordChange';
import Preferences from './Preferences';

const Settings = () => {
  const [fontSize, setFontSize] = useState('16px');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`settings-container ${darkMode ? 'dark' : ''} p-6`}>
      <SheetComponent />
      <main className="settings-main text-foreground" style={{ fontSize }}>
        <h2 className="settings-title text-2xl mb-4">Settings</h2>
        <div className="settings-content grid grid-cols-1 md:grid-cols-2 gap-6">
          <AccountInfo />
          <Preferences darkMode={darkMode} setDarkMode={setDarkMode} fontSize={fontSize} setFontSize={setFontSize} />
        </div>
        <div className="settings-content grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PasswordChange />
        
        </div>
      </main>
    </div>
  );
};

export default Settings;

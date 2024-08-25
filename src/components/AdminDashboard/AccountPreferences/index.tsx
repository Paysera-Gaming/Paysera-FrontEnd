import React, { useState, useEffect } from 'react';
import AccountInfo from './AccountInfo';
import PasswordChange from './PasswordChange';
import Preferences from './Preferences';
import SheetComponent from '../SheetComponent'; // Importing the SheetComponent

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('account');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case 'account':
        return <AccountInfo />;
      case 'preferences':
        return <Preferences darkMode={darkMode} setDarkMode={setDarkMode} />;
      case 'security':
        return <PasswordChange />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Settings Dashboard</h1>
          <p className="header-subtitle">Configure your preferences and account settings</p>
        </div>
        <div className="header-right">
          <SheetComponent /> {/* Profile component */}
          <div className="current-time">{currentTime}</div>
        </div>
      </header>

      <main className={`flex max-w-7xl mx-auto p-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg ${darkMode ? 'dark' : ''}`}>
        <aside className="w-1/4 p-4 bg-white dark:bg-gray-800 rounded-lg mr-8">
          <nav className="space-y-4">
            <button
              onClick={() => setSelectedTab('account')}
              className={`w-full text-left p-2 rounded-md ${selectedTab === 'account' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Account Information
            </button>
            <button
              onClick={() => setSelectedTab('preferences')}
              className={`w-full text-left p-2 rounded-md ${selectedTab === 'preferences' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Preferences
            </button>
            <button
              onClick={() => setSelectedTab('security')}
              className={`w-full text-left p-2 rounded-md ${selectedTab === 'security' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Security
            </button>
          </nav>
        </aside>
        <main className="w-3/4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Settings</h2>
          <div className="space-y-8">
            {renderContent()}
          </div>
        </main>
      </main>
    </div>
  );
};

export default Settings;

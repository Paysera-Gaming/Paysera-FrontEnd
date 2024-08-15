import React, { useState, useEffect } from 'react';
import SheetComponent from './SheetComponent';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { FaUpload, FaLock, FaBell } from 'react-icons/fa';

const Settings = () => {
  const [notificationsEnabledEmail, setNotificationsEnabledEmail] = useState(true);
  const [notificationsEnabledSMS, setNotificationsEnabledSMS] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [darkMode, setDarkMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Update root class when dark mode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = () => {
    if (password !== passwordConfirmation) {
      setPasswordError('Passwords do not match!');
    } else {
      setPasswordError('');
      // Logic to change the password
      alert('Password successfully changed!');
      setPassword('');
      setPasswordConfirmation('');
    }
  };

  return (
    <div className={`settings-container ${darkMode ? 'dark' : ''} p-6`}>
      <SheetComponent />
      <main className="settings-main text-foreground" style={{ fontSize }}>
        <h2 className="settings-title text-2xl mb-4">Settings</h2>
        <div className="settings-content grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <section className="settings-column">
            <h3 className="section-title text-lg mb-2">Account Information</h3>
            <form className="settings-form space-y-4">
              <div className="form-group">
                <label className="form-label block mb-1">Avatar</label>
                <div className="avatar-upload flex items-center space-x-4">
                  <Avatar className="profile-avatar">
                    <AvatarImage src={avatar || 'https://github.com/shadcn.png'} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <label className="upload-label cursor-pointer bg-input text-foreground px-3 py-2 rounded-md">
                    <FaUpload className="inline-block mr-2" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label block mb-1">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="form-input w-full p-2 border rounded-md bg-input text-foreground"
                />
              </div>
              <div className="form-group">
                <label className="form-label block mb-1">Bio</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself"
                  className="form-textarea w-full p-2 border rounded-md bg-input text-foreground"
                />
              </div>
            </form>
          </section>

          {/* Right Column */}
          <section className="settings-column">
            <h3 className="section-title text-lg mb-2">Preferences</h3>
            <form className="settings-form space-y-4">
              <div className="form-group">
                <label className="form-label block mb-1">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="form-select w-full p-2 border rounded-md bg-input text-foreground"
                >
                  <option value="14px">Small</option>
                  <option value="16px">Medium</option>
                  <option value="18px">Large</option>
                  <option value="20px">Extra Large</option>
                </select>
              </div>
              <div className="form-group flex justify-between items-center">
                <label className="form-label">Dark Mode</label>
                <Switch
                  checked={darkMode}
                  onCheckedChange={() => setDarkMode(!darkMode)}
                  className="form-switch"
                />
              </div>
            </form>
          </section>
        </div>

        <div className="settings-content grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Left Column */}
          <section className="settings-column">
            <h3 className="section-title text-lg mb-2"><FaLock className="inline-block mr-2" /> Security</h3>
            <form className="settings-form space-y-4">
              <div className="form-group">
                <label className="form-label block mb-1">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a new password"
                  className="form-input w-full p-2 border rounded-md bg-input text-foreground"
                />
              </div>
              <div className="form-group">
                <label className="form-label block mb-1">Confirm Password</label>
                <Input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirm your new password"
                  className="form-input w-full p-2 border rounded-md bg-input text-foreground"
                />
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <div className="text-right">
                <Button
                  onClick={handleChangePassword}
                  className="change-password-button bg-primary text-primary-foreground p-2 rounded-md"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </section>

          {/* Right Column */}
          <section className="settings-column">
            <h3 className="section-title text-lg mb-2"><FaBell className="inline-block mr-2" /> Notification Settings</h3>
            <form className="settings-form space-y-4">
              <div className="form-group flex justify-between items-center">
                <label className="form-label">Enable Email Notifications</label>
                <Switch
                  checked={notificationsEnabledEmail}
                  onCheckedChange={() => setNotificationsEnabledEmail(!notificationsEnabledEmail)}
                  className="form-switch"
                />
              </div>
              <div className="form-group flex justify-between items-center">
                <label className="form-label">Enable SMS Notifications</label>
                <Switch
                  checked={notificationsEnabledSMS}
                  onCheckedChange={() => setNotificationsEnabledSMS(!notificationsEnabledSMS)}
                  className="form-switch"
                />
              </div>
            </form>
          </section>
        </div>

        <div className="form-group full-width mt-6 text-center">
          <Button type="submit" className="save-button bg-primary text-primary-foreground p-2 rounded-md">
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;

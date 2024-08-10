import React, { useState } from 'react';
import SheetComponent from './SheetComponent';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [fontSize, setFontSize] = useState('16px');

  return (
    <div className="settings-container">
      <SheetComponent />
      <main className="settings-main" style={{ fontSize }}>
        <h2 className="settings-title">Settings</h2>
        <div className="settings-content">
          {/* Left Column */}
          <section className="settings-column">
            <h3 className="section-title">Account Information</h3>
            <form className="settings-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Bio</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself"
                  className="form-textarea"
                />
              </div>
            </form>
          </section>

          {/* Right Column */}
          <section className="settings-column">
            <h3 className="section-title">Preferences</h3>
            <div className="form-group switch-group">
              <span className="form-label">Enable Notifications</span>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="form-switch"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="form-select"
              >
                <option value="14px">Small</option>
                <option value="16px">Medium</option>
                <option value="18px">Large</option>
                <option value="20px">Extra Large</option>
              </select>
            </div>
            <Button type="submit" className="save-button">
              Save Changes
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Settings;

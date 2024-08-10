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

  return (
    <div className="settings-container">
      <SheetComponent />
      <main className="settings-main">
        <h2 className="settings-title">Settings</h2>
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
          <div className="form-group switch-group">
            <span className="form-label">Enable Notifications</span>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="form-switch"
            />
          </div>
          <Button type="submit" className="save-button">
            Save Changes
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Settings;

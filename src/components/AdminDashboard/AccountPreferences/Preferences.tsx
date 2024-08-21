import React from 'react';
import { Switch } from '../../ui/switch';

const Preferences = ({ darkMode, setDarkMode, fontSize, setFontSize }) => {
  return (
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
            onCheckedChange={(checked) => setDarkMode(checked)}
            className="form-switch"
          />
        </div>
      </form>
    </section>
  );
};

export default Preferences;

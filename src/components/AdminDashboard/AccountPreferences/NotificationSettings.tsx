import React, { useState } from 'react';
import { Switch } from '../../ui/switch';

const NotificationSettings = () => {
  const [notificationsEnabledEmail, setNotificationsEnabledEmail] = useState(true);
  const [notificationsEnabledSMS, setNotificationsEnabledSMS] = useState(false);

  return (
    <section className="settings-column">
      <h3 className="section-title text-lg mb-2">Notification Settings</h3>
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
  );
};

export default NotificationSettings;

import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import AvatarUpload from './AvatarUpload';

const AccountInfo = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  return (
    <section className="settings-column">
      <h3 className="section-title text-lg mb-2">Account Information</h3>
      <form className="settings-form space-y-4">
        <AvatarUpload />
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
  );
};

export default AccountInfo;

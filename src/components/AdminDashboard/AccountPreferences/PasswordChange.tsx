import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const PasswordChange = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChangePassword = () => {
    if (password !== passwordConfirmation) {
      setPasswordError('Passwords do not match!');
    } else {
      setPasswordError('');
      alert('Password successfully changed!');
      setPassword('');
      setPasswordConfirmation('');
    }
  };

  return (
    <section className="settings-column">
      <h3 className="section-title text-lg mb-2">Security</h3>
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
  );
};

export default PasswordChange;

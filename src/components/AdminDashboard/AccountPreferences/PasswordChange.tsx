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
    <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Security</h3>
      <form className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a new password"
            className="w-full p-2 border rounded-md text-sm bg-gray-50 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <Input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm your new password"
            className="w-full p-2 border rounded-md text-sm bg-gray-50 dark:bg-gray-900 dark:text-white"
          />
        </div>
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        <div className="text-right">
          <Button
            onClick={handleChangePassword}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PasswordChange;

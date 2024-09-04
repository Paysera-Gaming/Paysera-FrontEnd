import { useState } from 'react';
import { Input } from '../../ui/input';
import { CircleUser } from 'lucide-react';

const AccountInfo = () => {
  const [username, setUsername] = useState('');

  return (
    <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Account Information</h3>
      <form className="space-y-6">
        <div className="flex items-center mb-4">
          <CircleUser size={48} className="text-gray-700 dark:text-gray-300 mr-4" />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border rounded-md text-sm bg-gray-50 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AccountInfo;
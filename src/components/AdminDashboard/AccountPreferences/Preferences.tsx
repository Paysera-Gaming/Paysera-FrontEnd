import { Switch } from '../../ui/switch';

const Preferences = ({ darkMode, setDarkMode }) => {
  return (
    <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Preferences</h3>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</label>
        <Switch
          checked={darkMode}
          onCheckedChange={(checked) => setDarkMode(checked)}
          className="form-switch"
        />
      </div>
    </section>
  );
};

export default Preferences;

import React, { useState } from "react";

function SettingsPage({ userSettings, onUpdateSettings }) {
  const [settings, setSettings] = useState({ ...userSettings });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await onUpdateSettings(settings);
      setMessage("Settings saved successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Email Notifications</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-all"></div>
          </label>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Dark Mode</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-all"></div>
          </label>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        {/* Feedback Message */}
        {message && (
          <p
            className={`text-center mt-2 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default SettingsPage;

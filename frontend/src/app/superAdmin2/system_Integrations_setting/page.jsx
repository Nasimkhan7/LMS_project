'use client';
import React, { useState } from "react";

const initialIntegrations = [
  { key: "google", name: "Google Integration", enabled: true },
  { key: "zoom", name: "Zoom Integration", enabled: false },
  { key: "email", name: "Email Service", enabled: true },
  { key: "sms", name: "SMS Gateway", enabled: false },
];

export default function SystemIntegrationsSetting() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [settings, setSettings] = useState({
    timezone: "Asia/Kolkata",
    language: "English",
  });
  const [notif, setNotif] = useState("");

  const handleToggle = (key) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.key === key ? { ...i, enabled: !i.enabled } : i
      )
    );
    const integration = integrations.find((i) => i.key === key);
    setNotif(
      `${integration?.name} ${integration?.enabled ? "disabled" : "enabled"}!`
    );
    setTimeout(() => setNotif(""), 2000);
  };

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSettings((s) => ({ ...s, [name]: value }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setNotif("Settings saved!");
    setTimeout(() => setNotif(""), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative">
      {/* Notification */}
      {notif && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded shadow-lg animate-bounce">
          {notif}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">System Integrations & Settings</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Integrations</h2>
        <ul className="space-y-4">
          {integrations.map((integration) => (
            <li key={integration.key} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-4">
              <span className="font-semibold flex items-center gap-2">
                {integration.enabled ? (
                  <span className="text-green-500 text-lg">✅</span>
                ) : (
                  <span className="text-red-500 text-lg">❌</span>
                )}
                {integration.name}
              </span>
              <button
                onClick={() => handleToggle(integration.key)}
                className={`px-4 py-1 rounded-full font-bold transition ${
                  integration.enabled
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {integration.enabled ? "Enabled" : "Disabled"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Global Settings</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSaveSettings}
        >
          <div>
            <label className="block mb-1 font-semibold">Timezone</label>
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleSettingChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="Asia/Dubai">Asia/Dubai</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Language</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleSettingChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="mt-2 px-6 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
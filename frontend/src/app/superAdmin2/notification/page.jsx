'use client';
import React, { useState } from "react";

// Dummy schools list (aap API se bhi la sakte hain)
const schools = [
  { id: "all", name: "All Schools" },
  { id: "1", name: "Delhi Public School" },
  { id: "2", name: "St. Xavier's School" },
];

const initialNotifications = [
  {
    id: 1,
    title: "System Maintenance",
    message: "LMS will be down for maintenance on 15th Sept, 10pm-12am.",
    target: "all",
    expiresAt: "2025-09-16T00:00",
  },
  {
    id: 2,
    title: "Subscription Expiry",
    message: "Your subscription will expire soon. Please renew.",
    target: "1",
    expiresAt: "2025-09-20T23:59",
  },
];

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [form, setForm] = useState({
    title: "",
    message: "",
    target: "all",
    expiresAt: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim() || !form.expiresAt) return;
    if (editId) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === editId ? { ...n, ...form } : n
        )
      );
    } else {
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({ title: "", message: "", target: "all", expiresAt: "" });
    setEditId(null);
  };

  const handleEdit = (notif) => {
    setForm({
      title: notif.title,
      message: notif.message,
      target: notif.target,
      expiresAt: notif.expiresAt,
    });
    setEditId(notif.id);
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ title: "", message: "", target: "all", expiresAt: "" });
    }
  };

  // Filter out expired notifications for display
  const now = new Date();
  const activeNotifications = notifications.filter(
    (n) => new Date(n.expiresAt) > now
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Notification Management</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Target</label>
          <select
            name="target"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.target}
            onChange={handleChange}
            required
          >
            {schools.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            name="message"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.message}
            onChange={handleChange}
            required
            rows={2}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Expiry Date & Time</label>
          <input
            type="datetime-local"
            name="expiresAt"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.expiresAt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Notifications</h2>
        <div className="space-y-4">
          {activeNotifications.length === 0 && (
            <div className="text-gray-400">No active notifications.</div>
          )}
          {activeNotifications.map((n) => (
            <div key={n.id} className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold">{n.title}</div>
                <div className="text-sm">{n.message}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Target: {n.target === "all" ? "All Schools" : schools.find(s => s.id === n.target)?.name || n.target}
                  {" | "}Expires: {new Date(n.expiresAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleEdit(n)}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
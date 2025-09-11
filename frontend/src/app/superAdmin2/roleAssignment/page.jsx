'use client';
import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "Rahul Kumar", email: "rahul@example.com", role: "Student" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "Teacher" },
];

const roles = ["Super Admin", "Admin", "Teacher", "Student"];

export default function RoleAssignment() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ name: "", email: "", role: roles[0] });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    if (editId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editId ? { ...u, ...form } : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({ name: "", email: "", role: roles[0] });
    setEditId(null);
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: "", email: "", role: roles[0] });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Role Assignment</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Role</label>
          <select
            name="role"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.role}
            onChange={handleChange}
            required
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update" : "Assign"}
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b dark:border-gray-700">Name</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Email</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Role</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-3 border-b dark:border-gray-700">{user.name}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{user.email}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{user.role}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
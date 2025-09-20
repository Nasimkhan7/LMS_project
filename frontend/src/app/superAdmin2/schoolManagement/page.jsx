'use client';
import React, { useState, useEffect } from "react";

const initialSchools = [
  {
    id: 1,
    name: "Delhi Public School",
    approved: true,
    expiry: "2025-12-31",
    studentLimit: 500,
    teacherLimit: 50,
    image: "",
  },
];

export default function SchoolManagement({ setSchoolCount }) {
  const [schools, setSchools] = useState(initialSchools);
  const [form, setForm] = useState({
    name: "",
    expiry: "",
    studentLimit: "",
    teacherLimit: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showNotif, setShowNotif] = useState(false); // <-- Add this

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((f) => ({ ...f, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // Add or update school
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editId) {
      setSchools((prev) =>
        prev.map((s) =>
          s.id === editId
            ? {
                ...s,
                ...form,
                image: imagePreview || s.image,
                studentLimit: Number(form.studentLimit),
                teacherLimit: Number(form.teacherLimit),
              }
            : s
        )
      );
    } else {
      setSchools((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          approved: false,
          image: imagePreview,
          studentLimit: Number(form.studentLimit),
          teacherLimit: Number(form.teacherLimit),
        },
      ]);
      setShowNotif(true); // <-- Show notification on add
      setTimeout(() => setShowNotif(false), 2500); // Hide after 2.5s
    }
    setForm({
      name: "",
      expiry: "",
      studentLimit: "",
      teacherLimit: "",
      image: "",
    });
    setEditId(null);
    setImagePreview("");
  };

  // Edit school
  const handleEdit = (school) => {
    setForm({
      name: school.name,
      expiry: school.expiry,
      studentLimit: school.studentLimit,
      teacherLimit: school.teacherLimit,
      image: "",
    });
    setEditId(school.id);
    setImagePreview(school.image);
  };

  // Delete school
  const handleDelete = (id) => {
    setSchools((prev) => prev.filter((s) => s.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({
        name: "",
        expiry: "",
        studentLimit: "",
        teacherLimit: "",
        image: "",
      });
      setImagePreview("");
    }
  };

  // Approve/Deactivate school
  const handleToggleApprove = (id) => {
    setSchools((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, approved: !s.approved } : s
      )
    );
  };

  // Yeh useEffect schools array ke update hone par parent ko count bhejega
  useEffect(() => {
    if (setSchoolCount) setSchoolCount(schools.length);
  }, [schools, setSchoolCount]);

  return (
    <div className="relative max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      {/* Notification */}
      {showNotif && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-bounce">
          🎉 New school added successfully!
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">School Management</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-1 font-semibold">School Name</label>
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
          <label className="block mb-1 font-semibold">Subscription Expiry</label>
          <input
            type="date"
            name="expiry"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.expiry}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Student Limit</label>
          <input
            type="number"
            name="studentLimit"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.studentLimit}
            onChange={handleChange}
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Teacher Limit</label>
          <input
            type="number"
            name="teacherLimit"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.teacherLimit}
            onChange={handleChange}
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">School Picture</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full"
            onChange={handleChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-16 w-16 object-cover rounded"
            />
          )}
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update School" : "Add School"}
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Schools</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b dark:border-gray-700">Picture</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Name</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Expiry</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Student Limit</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Teacher Limit</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Status</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="text-center">
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    {school.image ? (
                      <img
                        src={school.image}
                        alt={school.name}
                        className="h-10 w-10 object-cover rounded mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{school.name}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{school.expiry}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{school.studentLimit}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{school.teacherLimit}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        school.approved
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {school.approved ? "Approved" : "Deactive"}
                    </span>
                  </td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleToggleApprove(school.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                          school.approved
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                        title={school.approved ? "Deactivate" : "Approve"}
                      >
                        {school.approved ? (
                          <>
                            <span className="material-icons text-base">block</span> Deactivate
                          </>
                        ) : (
                          <>
                            <span className="material-icons text-base">check_circle</span> Approve
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(school)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                        title="Edit"
                      >
                        <span className="material-icons text-base">edit</span> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(school.id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition"
                        title="Delete"
                      >
                        <span className="material-icons text-base">delete</span> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {schools.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-gray-400">
                    No schools found.
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
'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

export default function RegisterTeacherPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
    subjects: [],
    classes: [],
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // For redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, photo: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    try {
      // Simulate API call
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("photo", form.photo);
      formData.append("subjects", JSON.stringify(form.subjects));
      formData.append("classes", JSON.stringify(form.classes));

      // Replace with actual API call
      console.log("Submitting form:", formData);

      setSuccess("Teacher registered successfully!");

      // Redirect to manage-teachers page after successful registration
      setTimeout(() => {
        router.push("/admin/manage-teachers");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError("Failed to register teacher. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Register Teacher</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Profile Picture</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            onChange={handleFileChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Subjects</label>
          <select
            name="subjects"
            multiple
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.subjects}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                subjects: Array.from(e.target.selectedOptions, (option) => option.value),
              }))
            }
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Classes</label>
          <select
            name="classes"
            multiple
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.classes}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                classes: Array.from(e.target.selectedOptions, (option) => option.value),
              }))
            }
          >
            {classes.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
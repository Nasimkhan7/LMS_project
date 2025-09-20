'use client';
import React, { useState } from "react";

export default function FeeStudentPage() {
  const [form, setForm] = useState({
    studentId: "",
    totalFee: "",
    paidFee: "",
    dueDate: "",
    status: "",
    photo: null,
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [preview, setPreview] = useState(null);

  // Calculate balance fee
  const balanceFee =
    form.totalFee && form.paidFee
      ? Math.max(Number(form.totalFee) - Number(form.paidFee), 0)
      : "";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length > 0) {
      setForm({ ...form, photo: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
    setStatus("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("studentId", form.studentId);
      formData.append("totalFee", form.totalFee);
      formData.append("paidFee", form.paidFee);
      formData.append("balanceFee", balanceFee);
      formData.append("dueDate", form.dueDate);
      formData.append("status", form.status);
      if (form.photo) formData.append("photo", form.photo);

      const res = await fetch("/fee", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Fee record added successfully!");
        setForm({
          studentId: "",
          totalFee: "",
          paidFee: "",
          dueDate: "",
          status: "",
          photo: null,
        });
        setPreview(null);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to add fee record.");
      }
    } catch {
      setError("Network error.");
    }
  };

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex items-center justify-center transition-colors duration-500`}>
      <form
        onSubmit={handleSubmit}
        className={`${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-2xl rounded-xl p-8 w-full max-w-lg transition-colors duration-500`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center flex-1">
            Add Student Fee
          </h2>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className={`ml-4 px-3 py-1 rounded border transition-colors duration-300
              ${dark
                ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-yellow-300 border-yellow-400 shadow-lg"
                : "bg-gradient-to-r from-gray-100 via-white to-gray-200 text-gray-700 border-gray-300 shadow"
              } hover:scale-105`}
            aria-label="Toggle dark mode"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <label className={`block mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`} htmlFor="photo">
            Student Photo
          </label>
          <input
            name="photo"
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className={`w-full ${dark ? "text-gray-200" : "text-gray-700"}`}
          />
          {preview && (
            <img
              src={preview}
              alt="Student Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full border shadow-lg"
            />
          )}
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`} htmlFor="studentId">
            Student ID
          </label>
          <input
            name="studentId"
            id="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit ${dark ? "text-white" : "text-gray-900"}`}
            placeholder="Enter student ID"
          />
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`} htmlFor="totalFee">
            Total Fee
          </label>
          <input
            name="totalFee"
            id="totalFee"
            type="number"
            value={form.totalFee}
            onChange={handleChange}
            required
            min="0"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit ${dark ? "text-white" : "text-gray-900"}`}
            placeholder="Enter total fee"
          />
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`} htmlFor="paidFee">
            Paid Fee
          </label>
          <input
            name="paidFee"
            id="paidFee"
            type="number"
            value={form.paidFee}
            onChange={handleChange}
            required
            min="0"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit ${dark ? "text-white" : "text-gray-900"}`}
            placeholder="Enter paid fee"
          />
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`} htmlFor="balanceFee">
            Balance Fee
          </label>
          <input
            name="balanceFee"
            id="balanceFee"
            type="number"
            value={balanceFee}
            readOnly
            className={`w-full px-3 py-2 border rounded ${dark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none`}
            placeholder="Balance fee"
          />
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`} htmlFor="dueDate">
            Due Date
          </label>
          <input
            name="dueDate"
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit ${dark ? "text-white" : "text-gray-900"}`}
          />
        </div>
        <div className="mb-6">
          <label className={`block mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`} htmlFor="status">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={form.status}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit ${dark ? "text-white" : "text-gray-900"}`}
          >
            <option value="">Select status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Fee
        </button>
        {status && <p className="text-green-600 text-center mt-4">{status}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
}
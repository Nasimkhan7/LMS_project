'use client';
import React, { useState } from "react";

export default function FeeStudentPage() {
  const [form, setForm] = useState({
    enrollNum: "",
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
      const feeData = {
        enrollNum: form.enrollNum,
        totalFee: Number(form.totalFee),
        paidFee: Number(form.paidFee),
        balanceFee: Number(balanceFee),
        dueDate: form.dueDate,
        status: form.status,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fee`, {
        method: "POST",
        body: JSON.stringify(feeData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        setStatus("Fee record added successfully!");
        setForm({
          enrollNum: "",
          totalFee: "",
          paidFee: "",
          dueDate: "",
          status: "",
          photo: null,
        });
        setPreview(null);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add fee record.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Student Fee Management</h1>
              <button
                type="button"
                onClick={() => setDark(!dark)}
                className="ml-4 p-2 rounded-lg bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                <span className="text-xl">{dark ? "🌙" : "☀️"}</span>
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Add and manage student fee records</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Add New Fee Record
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Upload */}
                <div className="md:col-span-2 flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-blue-200 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Student Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-4xl">👤</span>
                      )
                      }
                    </div>
                    <label
                      htmlFor="photo"
                      className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                    >
                      <span className="text-sm">📷</span>
                    </label>
                  </div>
                  <input
                    name="photo"
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Upload student photo (optional)</p>
                </div>

                {/* Enrollment Number */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="enrollNum">
                    Enrollment Number *
                  </label>
                  <input
                    name="enrollNum"
                    id="enrollNum"
                    value={form.enrollNum}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    placeholder="Enter student enrollment number"
                  />
                </div>

                {/* Total Fee */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="totalFee">
                    Total Fee Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      name="totalFee"
                      id="totalFee"
                      type="number"
                      value={form.totalFee}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Paid Fee */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="paidFee">
                    Paid Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      name="paidFee"
                      id="paidFee"
                      type="number"
                      value={form.paidFee}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Balance Fee (Read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="balanceFee">
                    Balance Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      name="balanceFee"
                      id="balanceFee"
                      type="number"
                      value={balanceFee}
                      readOnly
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="dueDate">
                    Due Date *
                  </label>
                  <input
                    name="dueDate"
                    id="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all"
                  />
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="status">
                    Payment Status *
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all"
                  >
                    <option value="">Select payment status</option>
                    <option value="Paid">✅ Paid</option>
                    <option value="Unpaid">❌ Unpaid</option>
                    <option value="Partial">⚠️ Partial</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">💾</span>
                    Add Fee Record
                  </span>
                </button>
              </div>

              {/* Status Messages */}
              {status && (
                <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg">
                  <p className="text-green-700 dark:text-green-300 text-center flex items-center justify-center gap-2">
                    <span className="text-xl">✅</span>
                    {status}
                  </p>
                </div>
              )}
              
              {error && (
                <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-center flex items-center justify-center gap-2">
                    <span className="text-xl">❌</span>
                    {error}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/admin"
              className="px-6 py-3 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-all duration-200 flex items-center gap-2"
            >
              <span>⬅️</span>
              Back to Admin
            </a>
            <a
              href="/admin/view-fees"
              className="px-6 py-3 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-all duration-200 flex items-center gap-2"
            >
              <span>👁️</span>
              View All Fees
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
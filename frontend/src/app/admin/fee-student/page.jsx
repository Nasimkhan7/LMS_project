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
  const [studentData, setStudentData] = useState(null);
  const [fetchingStudent, setFetchingStudent] = useState(false);
  const [studentError, setStudentError] = useState("");
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

  const handleEnrollNumChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, enrollNum: value });
    setStudentData(null);
    setStudentError("");
    setPreview(null);
    setStatus("");
    setError("");
  };

  const fetchStudentDetails = async () => {
    if (!form.enrollNum.trim()) {
      setStudentError("Please enter enrollment number");
      return;
    }

    setFetchingStudent(true);
    setStudentError("");
    setStudentData(null);

    try {
      // Changed from /students/enrollment/ to /registrations/enrollment/
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration/enrollment/${form.enrollNum}`);
      
      if (response.ok) {
        const student = await response.json();
        setStudentData(student);
        
        // Set preview image if student has photo (optional since registration might not have photos)
        if (student.photo) {
          setPreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/students/${student.photo}`);
        }
      } else if (response.status === 404) {
        setStudentError("Student not found with this enrollment number");
      } else {
        const errorData = await response.json();
        setStudentError(errorData.error || "Failed to fetch student details");
      }
    } catch (err) {
      setStudentError("Network error. Please try again.");
    } finally {
      setFetchingStudent(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!studentData) {
      setError("Please fetch student details first");
      return;
    }

    setStatus("");
    setError("");
    
    try {
      const feeData = {
        studentId: studentData._id,
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
        setStudentData(null);
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
        <div className="max-w-4xl mx-auto">
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
            <p className="text-gray-600 dark:text-gray-300">Search student and manage fee records</p>
          </div>

          {/* Student Search Card */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Search Student
              </h2>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    value={form.enrollNum}
                    onChange={handleEnrollNumChange}
                    placeholder="Enter student enrollment number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={fetchStudentDetails}
                    disabled={!form.enrollNum.trim() || fetchingStudent}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    {fetchingStudent ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <span>🔍</span>
                        Search
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Student Error */}
              {studentError && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 flex items-center gap-2">
                    <span>❌</span>
                    {studentError}
                  </p>
                </div>
              )}

              {/* Student Details */}
              {studentData && (
                <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-600 rounded-lg">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full border-4 border-green-200 dark:border-green-600 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-2xl">👤</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        {studentData.firstName} {studentData.lastName}
                      </h3>
                      <p className="text-green-600 dark:text-green-300">
                        <strong>Enrollment:</strong> {studentData.enrollNum}
                      </p>
                      <p className="text-green-600 dark:text-green-300">
                        <strong>Grade:</strong> {studentData.grade}
                      </p>
                      <p className="text-green-600 dark:text-green-300">
                        <strong>Email:</strong> {studentData.email}
                      </p>
                      <p className="text-green-600 dark:text-green-300">
                        <strong>Phone:</strong> {studentData.phone}
                      </p>
                      <p className="text-green-600 dark:text-green-300">
                        <strong>Parent:</strong> {studentData.parentName} ({studentData.parentContact})
                      </p>
                    </div>
                    <div className="text-green-600 dark:text-green-300 text-3xl">
                      ✅
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fee Management Form */}
          {studentData && (
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Add Fee Record for {studentData.firstName} {studentData.lastName}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        step="0.01"
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
                        step="0.01"
                        max={form.totalFee || undefined}
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
                        type="text"
                        value={balanceFee || "0.00"}
                        readOnly
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
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
                      min={new Date().toISOString().split('T')[0]}
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
                      <option value="Overdue">🔴 Overdue</option>
                    </select>
                  </div>
                </div>

                {/* Fee Summary */}
                {form.totalFee && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-600 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Fee Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-blue-600 dark:text-blue-300 font-medium">Total Fee</p>
                        <p className="text-lg font-bold text-blue-800 dark:text-blue-200">₹{form.totalFee}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-green-600 dark:text-green-300 font-medium">Paid Amount</p>
                        <p className="text-lg font-bold text-green-800 dark:text-green-200">₹{form.paidFee || "0"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-orange-600 dark:text-orange-300 font-medium">Balance</p>
                        <p className="text-lg font-bold text-orange-800 dark:text-orange-200">₹{balanceFee || "0"}</p>
                      </div>
                    </div>
                  </div>
                )}

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
          )}

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
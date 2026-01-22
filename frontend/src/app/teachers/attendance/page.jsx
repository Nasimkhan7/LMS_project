'use client';
import React, { useState } from "react";

const AttendancePage = () => {
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [isSaved, setIsSaved] = useState(false); // For save feedback

  const students = [
    { id: 1, name: "Rahul Sharma" },
    { id: 2, name: "Priya Singh" },
    { id: 3, name: "Amit Verma" },
  ];

  // Handle attendance change
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Save attendance
  const handleSaveAttendance = () => {
    if (!selectedDate) {
      alert("Please select a date before saving attendance.");
      return;
    }

    console.log("Attendance saved:", { date: selectedDate, attendance });
    setIsSaved(true);

    // Reset save feedback after 3 seconds
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Calculate attendance summary
  const totalPresent = Object.values(attendance).filter((status) => status === "Present").length;
  const totalAbsent = Object.values(attendance).filter((status) => status === "Absent").length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Attendance</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Manage student attendance records here.
      </p>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Select Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Attendance Table */}
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-lg mb-6">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Student Name</th>
            <th className="py-2 px-4 border-b">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={attendance[student.id] || "Absent"}
                  onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-300">Summary</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Total Present: <span className="font-bold">{totalPresent}</span>
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Total Absent: <span className="font-bold">{totalAbsent}</span>
        </p>
      </div>

      {/* Save Attendance Button */}
      <button
        onClick={handleSaveAttendance}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Save Attendance
      </button>

      {/* Save Feedback */}
      {isSaved && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Attendance saved successfully!
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
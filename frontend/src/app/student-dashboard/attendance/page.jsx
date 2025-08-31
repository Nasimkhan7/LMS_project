'use client';
import React, { useState } from "react";

// Dummy attendance data
const attendanceData = [
  { date: "2025-08-01", present: true },
  { date: "2025-08-02", present: false },
  { date: "2025-08-03", present: true },
  // ...add more data for demo
];

// Dummy next class and after class attendance data
const nextClass = {
  date: "2025-08-04",
  time: "10:00 AM",
  subject: "Mathematics",
  teacher: "Mr. Sharma",
};
const afterClassAttendance = [
  { date: "2025-08-04", present: true },
  { date: "2025-08-05", present: false },
  // ...add more data for demo
];

function getMonthlyAttendance(data, year, month) {
  return data.filter(
    (a) =>
      new Date(a.date).getFullYear() === year &&
      new Date(a.date).getMonth() === month
  );
}

function getYearlyAttendance(data, year) {
  return data.filter((a) => new Date(a.date).getFullYear() === year);
}

export default function StudentAttendance() {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const monthlyData = getMonthlyAttendance(attendanceData, selectedYear, selectedMonth);
  const yearlyData = getYearlyAttendance(attendanceData, selectedYear);

  const totalDays = monthlyData.length;
  const presentDays = monthlyData.filter((a) => a.present).length;
  const absentDays = totalDays - presentDays;

  const yearlyTotal = yearlyData.length;
  const yearlyPresent = yearlyData.filter((a) => a.present).length;
  const yearlyAbsent = yearlyTotal - yearlyPresent;

  // For graph: monthly attendance summary
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthlySummary = months.map((_, idx) => {
    const data = getMonthlyAttendance(attendanceData, selectedYear, idx);
    return data.filter((a) => a.present).length;
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Student Attendance</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <div>
          <label className="font-semibold mr-2">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            {months.map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded shadow text-center">
          <div className="text-lg font-bold text-blue-700">Monthly</div>
          <div className="mt-2 text-gray-700">Present: <span className="font-bold">{presentDays}</span></div>
          <div className="text-gray-700">Absent: <span className="font-bold">{absentDays}</span></div>
          <div className="text-gray-700">Total: <span className="font-bold">{totalDays}</span></div>
        </div>
        <div className="bg-green-50 p-4 rounded shadow text-center">
          <div className="text-lg font-bold text-green-700">Yearly</div>
          <div className="mt-2 text-gray-700">Present: <span className="font-bold">{yearlyPresent}</span></div>
          <div className="text-gray-700">Absent: <span className="font-bold">{yearlyAbsent}</span></div>
          <div className="text-gray-700">Total: <span className="font-bold">{yearlyTotal}</span></div>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow text-center">
          <div className="text-lg font-bold text-yellow-700">Total Attendance</div>
          <div className="mt-2 text-gray-700">Present: <span className="font-bold">{attendanceData.filter(a => a.present).length}</span></div>
          <div className="text-gray-700">Absent: <span className="font-bold">{attendanceData.filter(a => !a.present).length}</span></div>
          <div className="text-gray-700">Total: <span className="font-bold">{attendanceData.length}</span></div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2 text-gray-800">Monthly Attendance Graph</h3>
        <div className="flex items-end h-40 gap-2 bg-gray-50 p-4 rounded">
          {monthlySummary.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center justify-end h-full">
              <div
                className="w-8 rounded bg-blue-500"
                style={{ height: `${val * 10}px` }}
                title={`${months[idx]}: ${val} days present`}
              ></div>
              <span className="text-xs mt-1 text-gray-700">{months[idx]}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-gray-800">Attendance Details</h3>
        <table className="min-w-full border border-gray-300 rounded-lg mb-4">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No attendance data for this month.
                </td>
              </tr>
            ) : (
              monthlyData.map((a, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{a.date}</td>
                  <td className="py-2 px-4 border-b">
                    {a.present ? (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Present</span>
                    ) : (
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded">Absent</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Next Class Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2 text-blue-700">Next Class</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-semibold text-blue-700">{nextClass.subject}</span>
            <span className="ml-2 text-gray-600">by {nextClass.teacher}</span>
          </div>
          <div className="mt-2 md:mt-0 text-sm text-gray-500">
            {nextClass.date} | {nextClass.time}
          </div>
        </div>
      </div>
      {/* After Class Attendance Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2 text-green-700">After Class Attendance</h3>
        <table className="min-w-full border border-gray-300 rounded-lg mb-4">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {afterClassAttendance.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No after class attendance data.
                </td>
              </tr>
            ) : (
              afterClassAttendance.map((a, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{a.date}</td>
                  <td className="py-2 px-4 border-b">
                    {a.present ? (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Present</span>
                    ) : (
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded">Absent</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
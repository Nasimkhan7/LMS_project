'use client';
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const attendanceData = [
  { date: "2025-08-01", present: true },
  { date: "2025-08-02", present: false },
  { date: "2025-08-03", present: true },
  { date: "2025-08-04", present: false },
  { date: "2025-08-05", present: true },
];

function getMonthlyAttendance(data, year, month) {
  return data.filter(
    (a) =>
      new Date(a.date).getFullYear() === year &&
      new Date(a.date).getMonth() === month
  );
}

export default function StudentAttendance() {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const monthlyData = getMonthlyAttendance(attendanceData, selectedYear, selectedMonth);
  const totalDays = monthlyData.length;
  const presentDays = monthlyData.filter((a) => a.present).length;
  const absentDays = totalDays - presentDays;

  // Data for Attendance Graph
  const attendanceGraphData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [3, 2], // Example: 3 Present, 2 Absent
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  console.log("Attendance Graph Data:", attendanceGraphData); // Debugging the graph data

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
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Attendance Graph */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Attendance Graph</h3>
        <div className="w-full h-64">
          <Bar
            data={attendanceGraphData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
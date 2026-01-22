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

const studentData = {
  name: "Rahul Sharma",
  profilePicture: "https://via.placeholder.com/40", // Replace with actual profile picture URL
  class: "Class 10",
  rollNumber: "12345",
  feeStatus: {
    totalFee: 50000,
    paidFee: 40000,
    dueFee: 10000,
    dueDate: "2025-10-15",
  },
  attendance: {
    totalDays: 200,
    presentDays: 180,
    absentDays: 20,
  },
  parent: {
    name: "Mr. Rajesh Sharma",
    contact: "+91 9876543210",
  },
  classTeacher: {
    name: "Mrs. Priya Singh",
    contact: "+91 9123456789",
    nextChange: "2025-12-01",
  },
  examResults: [
    { subject: "Mathematics", marks: 85 },
    { subject: "Science", marks: 90 },
    { subject: "English", marks: 78 },
    { subject: "History", marks: 88 },
    { subject: "Geography", marks: 92 },
  ],
  courseSchedule: [
    { day: "Monday", subject: "Mathematics", time: "10:00 AM - 11:00 AM" },
    { day: "Monday", subject: "Science", time: "11:15 AM - 12:15 PM" },
    { day: "Tuesday", subject: "English", time: "10:00 AM - 11:00 AM" },
    { day: "Tuesday", subject: "History", time: "11:15 AM - 12:15 PM" },
    { day: "Wednesday", subject: "Geography", time: "10:00 AM - 11:00 AM" },
    { day: "Wednesday", subject: "Mathematics", time: "11:15 AM - 12:15 PM" },
    { day: "Thursday", subject: "Science", time: "10:00 AM - 11:00 AM" },
    { day: "Thursday", subject: "English", time: "11:15 AM - 12:15 PM" },
    { day: "Friday", subject: "History", time: "10:00 AM - 11:00 AM" },
    { day: "Friday", subject: "Geography", time: "11:15 AM - 12:15 PM" },
  ],
};

// Exam Results Chart Data
const examResultsData = {
  labels: studentData.examResults.map((result) => result.subject),
  datasets: [
    {
      label: "Marks",
      data: studentData.examResults.map((result) => result.marks),
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

export default function StudentDashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard"); // State for active section
  const { name, profilePicture, class: studentClass, rollNumber, feeStatus, attendance, parent, classTeacher, examResults } = studentData;

  const handlePrint = () => {
    const printContent = document.getElementById("print-section").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload the page to restore the original content
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen sticky top-0 p-6">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">Student Menu</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "dashboard" ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white" : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
            } transition`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection("fees")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "fees" ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white" : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
            } transition`}
          >
            Fee Management
          </button>
          <button
            onClick={() => setActiveSection("attendance")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "attendance" ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white" : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
            } transition`}
          >
            Attendance
          </button>

          <button
            onClick={() => setActiveSection("Course-schedual")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "Course-schedual" ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white" : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
            } transition`}
          >
            Course-schedual
          </button>
          <button
            onClick={() => setActiveSection("examResults")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "examResults" ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white" : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
            } transition`}
          >
            Exam Results
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          {/* Student Profile */}
          <div className="flex items-center gap-4">
            <img
              src={profilePicture}
              alt="Student Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
            </div>
          </div>
        </header>

        {/* Render Active Section */}
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Dashboard</h1>
            <p>Welcome to your dashboard, {name}!</p>
          </div>
        )}

        {activeSection === "fees" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Fee Management</h1>
            <p><strong>Total Fee:</strong> ₹{feeStatus.totalFee}</p>
            <p><strong>Paid Fee:</strong> ₹{feeStatus.paidFee}</p>
            <p><strong>Due Fee:</strong> ₹{feeStatus.dueFee}</p>
            <p><strong>Due Date:</strong> {feeStatus.dueDate}</p>
          </div>
        )}

        {activeSection === "attendance" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Attendance</h1>
            <p><strong>Total Days:</strong> {attendance.totalDays}</p>
            <p><strong>Present Days:</strong> {attendance.presentDays}</p>
            <p><strong>Absent Days:</strong> {attendance.absentDays}</p>
          </div>
        )}

        {activeSection === "examResults" && (
          <div id="print-section" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Exam Results</h1>

            {/* Student Info */}
            <div className="mb-6">
              <p className="text-lg text-gray-700 dark:text-gray-200">
                <strong>Student Name:</strong> {name}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200">
                <strong>Roll Number:</strong> {rollNumber}
              </p>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Subject</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Marks</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {examResults.map((result) => (
                    <tr key={result.subject}>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">{result.subject}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">{result.marks}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                        {result.marks >= 90
                          ? "A+"
                          : result.marks >= 80
                          ? "A"
                          : result.marks >= 70
                          ? "B"
                          : result.marks >= 60
                          ? "C"
                          : "D"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Overall Performance */}
            <div className="mt-6 text-gray-700 dark:text-gray-200">
              <p><strong>Total Marks:</strong> {examResults.reduce((acc, result) => acc + result.marks, 0)}</p>
              <p><strong>Average Marks:</strong> {(examResults.reduce((acc, result) => acc + result.marks, 0) / examResults.length).toFixed(2)}</p>
            </div>

            {/* Print Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Print Result
              </button>
            </div>
          </div>
        )}

        {activeSection === "Course-schedual" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Course Schedule</h1>
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Day</th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Subject</th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {studentData.courseSchedule.map((schedule, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">{schedule.day}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">{schedule.subject}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">{schedule.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
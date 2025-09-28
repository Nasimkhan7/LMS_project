'use client';
import React from "react";

const studentData = {
  name: "Rahul Sharma",
  class: "Class 10",
  rollNumber: "12345",
  feeStatus: {
    totalFee: "₹50,000",
    paidFee: "₹40,000",
    dueFee: "₹10,000",
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
  },
  subjects: ["Mathematics", "Science", "English", "History", "Geography"],
};

const menuItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "fee-management", label: "Fee Management" },
  { key: "attendance", label: "Attendance" },
  { key: "parent-details", label: "Parent Details" },
  { key: "class-details", label: "Class Details" },
];

export default function StudentDashboardPage() {
  const { name, class: studentClass, rollNumber, feeStatus, attendance, parent, classTeacher, subjects } = studentData;

  const handleNavigation = (key) => {
    const section = document.getElementById(key);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen sticky top-0 p-6">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">Student Menu</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700 transition"
              onClick={() => handleNavigation(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Student Dashboard</h1>

        {/* Student Info */}
        <div className="mb-8" id="dashboard">
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Class:</strong> {studentClass}</p>
              <p><strong>Roll Number:</strong> {rollNumber}</p>
            </div>
          </div>
        </div>

        {/* Fee Management */}
        <div className="mb-8" id="fee-management">
          <h2 className="text-xl font-semibold mb-4">Fee Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Total Fee:</strong> {feeStatus.totalFee}</p>
            <p><strong>Paid Fee:</strong> {feeStatus.paidFee}</p>
            <p><strong>Due Fee:</strong> {feeStatus.dueFee}</p>
            <p><strong>Due Date:</strong> {feeStatus.dueDate}</p>
          </div>
        </div>

        {/* Attendance */}
        <div className="mb-8" id="attendance">
          <h2 className="text-xl font-semibold mb-4">Attendance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <p><strong>Total Days:</strong> {attendance.totalDays}</p>
            <p><strong>Present Days:</strong> {attendance.presentDays}</p>
            <p><strong>Absent Days:</strong> {attendance.absentDays}</p>
          </div>
        </div>

        {/* Parent Details */}
        <div className="mb-8" id="parent-details">
          <h2 className="text-xl font-semibold mb-4">Parent Details</h2>
          <div>
            <p><strong>Name:</strong> {parent.name}</p>
            <p><strong>Contact:</strong> {parent.contact}</p>
          </div>
        </div>

        {/* Class Details */}
        <div className="mb-8" id="class-details">
          <h2 className="text-xl font-semibold mb-4">Class Details</h2>
          <div>
            <p><strong>Class Teacher:</strong> {classTeacher.name}</p>
            <p><strong>Contact:</strong> {classTeacher.contact}</p>
            <p><strong>Subjects:</strong> {subjects.join(", ")}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const features = [
  { key: "manage-teachers", label: "Manage Teachers" },
  { key: "manage-students", label: "Manage Students" },
  { key: "manage-courses", label: "Manage Courses" },
  { key: "fee-management", label: "Fee Management" },
  { key: "attendance-management", label: "Attendance Management" },
  { key: "online-classes", label: "Online Classes" },
  { key: "reports-analytics", label: "Reports & Analytics" },
  { key: "notifications", label: "Notifications" },
  { key: "settings", label: "Settings" },
];

// Dummy Data for Dashboard Summary
const dashboardData = {
  totalStudents: 120,
  totalTeachers: 15,
  fees: [
    { class: "Class 10", total: 50000, due: 10000 },
    { class: "Class 9", total: 45000, due: 5000 },
  ],
  attendance: [
    { class: "Class 10", present: 25, absent: 5 },
    { class: "Class 9", present: 20, absent: 10 },
  ],
  activeTeachers: [
    { class: "Class 10", teacher: "Mr. Sharma" },
    { class: "Class 9", teacher: "Mrs. Priya" },
  ],
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login state
  const adminPhone = "+91 9876543210"; // Admin contact number

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/admin/login"); // Redirect to login page
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          You are logged out. Please log in to access the dashboard.
        </h1>
      </div>
    );
  }

  // Data for Fees Bar Chart
  const feesBarData = {
    labels: dashboardData.fees.map((fee) => fee.class),
    datasets: [
      {
        label: "Total Fees",
        data: dashboardData.fees.map((fee) => fee.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Due Fees",
        data: dashboardData.fees.map((fee) => fee.due),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Data for Attendance Pie Chart
  const attendancePieData = {
    labels: dashboardData.attendance.map((att) => att.class),
    datasets: [
      {
        label: "Attendance",
        data: dashboardData.attendance.map((att) => att.present),
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)"],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen sticky top-0 p-6">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
          {features.map((feature) => (
            <button
              key={feature.key}
              onClick={() => router.push(`/admin/${feature.key}`)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700 transition"
            >
              {feature.label}
            </button>
          ))}
        </nav>
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Admin Contact</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{adminPhone}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700 dark:text-blue-300">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </header>

        {/* Dashboard Summary */}
        <section className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Dashboard Summary</h2>

          {/* Total Students and Teachers Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Students</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{dashboardData.totalStudents}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Teachers</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{dashboardData.totalTeachers}</p>
            </div>
          </div>

          {/* Fees Summary Section */}
          <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Fees Summary</h3>
            <div className="w-full h-64">
              <Bar
                data={feesBarData}
                options={{
                  maintainAspectRatio: false, // Allow responsive resizing
                }}
              />
            </div>
            <div className="mt-4 text-gray-700 dark:text-gray-200">
              <p><strong>Total Fees:</strong> ₹{dashboardData.fees.reduce((acc, fee) => acc + fee.total, 0)}</p>
              <p><strong>Total Due Fees:</strong> ₹{dashboardData.fees.reduce((acc, fee) => acc + fee.due, 0)}</p>
            </div>
          </div>

          {/* Attendance Summary Section */}
          <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Attendance Summary</h3>
            <div className="w-full h-64">
              <Pie
                data={attendancePieData}
                options={{
                  maintainAspectRatio: false, // Allow responsive resizing
                }}
              />
            </div>
            <div className="mt-4 text-gray-700 dark:text-gray-200">
              {dashboardData.attendance.map((att) => (
                <p key={att.class}>
                  <strong>{att.class}:</strong> Present: {att.present}, Absent: {att.absent}
                </p>
              ))}
            </div>
          </div>

          {/* Active Teachers Section */}
          <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Active Teachers</h3>
            <div className="mt-4 text-gray-700 dark:text-gray-200">
              {dashboardData.activeTeachers.map((teacher) => (
                <p key={teacher.class}>
                  <strong>{teacher.class}:</strong> {teacher.teacher}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
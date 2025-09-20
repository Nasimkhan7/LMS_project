'use client';
import React from "react";

// Dummy data
const stats = [
  { label: "Total Schools", value: 24, color: "bg-blue-500" },
  { label: "Total Students", value: 3200, color: "bg-green-500" },
  { label: "Total Teachers", value: 210, color: "bg-yellow-500" },
  { label: "Active Subscriptions", value: 19, color: "bg-purple-500" },
  { label: "Total Revenue", value: "₹2,40,000", color: "bg-pink-500" },
  { label: "Total Fee Collected", value: "₹1,85,000", color: "bg-indigo-500" }, // New
  { label: "Pending Fees", value: "₹55,000", color: "bg-red-500" }, // New
];

// Dummy usage analytics
const usageStats = [
  { label: "Active Users (last 30d)", value: 1200 },
  { label: "Classes Conducted (last 30d)", value: 430 },
  { label: "Most Used Feature", value: "Live Classes" },
];

// Dummy feature usage data
const featureUsage = [
  { feature: "Live Classes", count: 180 },
  { feature: "Assignments", count: 120 },
  { feature: "Fee Management", count: 90 },
  { feature: "Attendance", count: 60 },
];

// Dummy notifications data
const notifications = [
  {
    id: 1,
    title: "Course Update",
    message: "New chapter added in Science.",
    target: "all",
    createdAt: "2025-09-12T10:00:00Z",
    expiresAt: "2025-09-15T23:59:59Z",
  },
];

export default function GlobleAnalyticsDashboard() {
  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-8 text-blue-700 dark:text-blue-300">Global Analytics Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg p-6 text-white shadow flex flex-col items-center ${stat.color}`}
          >
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="mt-2 text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Platform Usage Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {usageStats.map((u) => (
          <div
            key={u.label}
            className="rounded-lg p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow flex flex-col items-center"
          >
            <div className="text-2xl font-bold">{u.value}</div>
            <div className="mt-2 text-base">{u.label}</div>
          </div>
        ))}
      </div>
      {/* Feature Usage Bar (Dummy) */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Most Used Features (last 30d)</h2>
        <div className="space-y-4">
          {featureUsage.map((f) => (
            <div key={f.feature} className="flex items-center gap-4">
              <div className="w-40">{f.feature}</div>
              <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded h-4 relative">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{ width: `${f.count * 1.2}px`, maxWidth: "100%" }}
                ></div>
                <span className="absolute right-2 top-0 text-xs text-white">{f.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dummy Bar Chart */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Schools & Students Growth (Dummy Data)</h2>
        <div className="flex items-end gap-4 h-48">
          {[
            { month: "Jan", schools: 2, students: 200 },
            { month: "Feb", schools: 3, students: 350 },
            { month: "Mar", schools: 5, students: 600 },
            { month: "Apr", schools: 4, students: 500 },
            { month: "May", schools: 6, students: 800 },
            { month: "Jun", schools: 4, students: 750 },
          ].map((data) => (
            <div key={data.month} className="flex flex-col items-center flex-1">
              {/* Schools Bar */}
              <div
                className="w-6 rounded-t bg-blue-500 mb-1"
                style={{ height: `${data.schools * 20}px` }}
                title={`Schools: ${data.schools}`}
              ></div>
              {/* Students Bar */}
              <div
                className="w-6 rounded-t bg-green-500"
                style={{ height: `${data.students / 20}px` }}
                title={`Students: ${data.students}`}
              ></div>
              <div className="mt-2 text-xs text-gray-700 dark:text-gray-200">{data.month}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span> Schools
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span> Students
          </div>
        </div>
      </div>
    </div>
  );
}
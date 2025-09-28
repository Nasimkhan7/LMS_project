'use client';
import React from "react";
import { useRouter } from "next/navigation";

const features = [
  { key: "manage-teachers", label: "Manage Teachers", description: "Add, edit, or delete teachers and assign classes/subjects." },
  { key: "manage-students", label: "Manage Students", description: "Add, edit, or delete students and assign them to classes." },
  { key: "manage-courses", label: "Manage Courses", description: "Create, edit, or delete courses and manage curriculum." },
  { key: "fee-management", label: "Fee Management", description: "Track fee collection, pending fees, and due dates." },
  { key: "attendance-management", label: "Attendance Management", description: "Track attendance for teachers and students." },
  { key: "reports-analytics", label: "Reports & Analytics", description: "View performance reports and generate analytics." },
  { key: "notifications", label: "Notifications", description: "Send notifications to teachers and students." },
  { key: "settings", label: "Settings", description: "Update admin profile and manage system settings." },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleNavigation = (key) => {
    router.push(`/admin/${key}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => handleNavigation(feature.key)}
          >
            <div className="flex items-center gap-4">
              <span className="text-blue-500 text-2xl">
                <i className="fas fa-chalkboard-teacher"></i>
              </span>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{feature.label}</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
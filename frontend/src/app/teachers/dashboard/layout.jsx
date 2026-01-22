'use client';
import React from "react";
import Link from "next/link";

const TeacherDashboardLayout = ({ children }) => {
  const menuItems = [
    { text: "Dashboard", path: "/teachers/dashboard" },
    { text: "Attendance", path: "/teachers/dashboard/attendance" },
    { text: "Homework/Assignments", path: "/teachers/dashboard/homework" },
    { text: "Notes/Materials", path: "/teachers/dashboard/notes" },
    { text: "Exam & Results", path: "/teachers/dashboard/exam-results" },
    { text: "Student Interaction", path: "/teachers/dashboard/student-interaction" },
    { text: "Student Fees Due", path: "/teachers/dashboard/fees-due" },
    { text: "Resend Message", path: "/teachers/dashboard/resend-message" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Teacher Menu</h2>
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="block px-4 py-2 rounded-lg text-left w-full text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">{children}</main>
    </div>
  );
};

export default TeacherDashboardLayout;
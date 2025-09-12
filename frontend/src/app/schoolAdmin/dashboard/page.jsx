"use client";
import React, { useState } from "react";

export default function SchoolAdminDashboard() {
  const [activeTab, setActiveTab] = useState("Onboarding");
  const [darkMode, setDarkMode] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Onboarding":
        return <div>📋 Onboarding & Data Management Content</div>;
      case "Students":
        return <div>👩‍🎓 Student Management Content</div>;
      case "Teachers":
        return <div>👨‍🏫 Teacher Management Content</div>;
      case "Parents":
        return <div>👨‍👩‍👧 Parent Management Content</div>;
      case "Fees":
        return <div>💰 Fee Management Content</div>;
      case "Exams":
        return <div>📝 Exam & Schedule Content</div>;
      case "Analytics":
        return <div>📊 Analytics & Reports Content</div>;
      case "Theme":
        return (
          <div>
            🎨 Theme Customization  
            <p>Dark/Light Mode Toggle Available</p>
          </div>
        );
      default:
        return <div>Welcome to School Admin Dashboard</div>;
    }
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">🏫 School Admin Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-lg p-4">
          <ul className="space-y-3">
            {[
              "Onboarding",
              "Students",
              "Teachers",
              "Parents",
              "Fees",
              "Exams",
              "Analytics",
              "Theme",
            ].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import React, { useState, useEffect } from "react";
import SchoolManagement from "../schoolManagement/page";
import SubscriptionBillingManage from "../subscriptionBillingManage/page";
import Link from "next/link";
import RoleAssignment from "../roleAssignment/page";
import SystemIntegrationsSetting from "../system_Integrations_setting/page";
import GlobleAnalyticsDashboard from "../globleAnalytics_dashboard/page";
import Notification from "../notification/page";

const features = [
  { key: "school", label: "School Management" },
  { key: "subscription", label: "Subscription & Billing Management" },
  { key: "role", label: "Role Assignment" },
  { key: "integration", label: "System Integration & Setting" },
  { key: "analytics", label: "Global Analytics Dashboard" },
  { key: "notice", label: "Notice Board" },           // New
  { key: "settings", label: "Settings" },             // New
];

export default function SuperAdminDashboard() {
  const [active, setActive] = useState("school");
  const [dark, setDark] = useState(false);
  const [schoolCount, setSchoolCount] = useState(0); // <-- Add this

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const renderFeature = () => {
    switch (active) {
      case "school":
        return <SchoolManagement setSchoolCount={setSchoolCount} />;
      case "subscription":
        return <SubscriptionBillingManage />;
      case "role":
        return <RoleAssignment />;
      case "integration":
        return <SystemIntegrationsSetting/>;
      case "analytics":
        return <GlobleAnalyticsDashboard/>;
      case "notice":
        return <Notification/>; // New
      case "settings":
        return <div className="text-2xl font-bold">Settings Feature</div>;     // New
      default:
        return <div>Select a feature from sidebar.</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen sticky top-0 p-6 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Super Admin</h2>
          <button
            onClick={() => setDark((d) => !d)}
            className="ml-2 px-3 py-1 rounded bg-blue-600 text-white dark:bg-gray-700 dark:text-blue-200 font-semibold shadow hover:bg-blue-700 dark:hover:bg-gray-600 transition"
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {features.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`flex items-center justify-between text-left px-4 py-2 rounded font-semibold transition ${
                active === f.key
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
            >
              <span>{f.label}</span>
              {f.key === "school" && (
                <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {schoolCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto transition-colors duration-300">
          {renderFeature()}
        </div>
      </main>
    </div>
  );
}

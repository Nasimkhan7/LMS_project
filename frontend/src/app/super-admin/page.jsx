'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Example: Replace with your actual authentication logic
const isSuperAdmin = true; // Set to false for non-super-admins

export default function SuperAdminPage() {
  const router = useRouter();

  const [enabled, setEnabled] = useState({
    "Manage Students": true,
    "Manage Teachers": true,
    "Online Classes": true,
    "Fee Management": true,
    "Reports": true,
  });

  const cards = [
    {
      title: "Manage Students",
      description: "View, add, edit, or delete student records.",
      link: "/admin/manage-student",
      color: "bg-blue-600",
    },
    {
      title: "Manage Teachers",
      description: "View, add, edit, or delete teacher records.",
      link: "/admin/manage-teachers",
      color: "bg-green-600",
    },
    {
      title: "Online Classes",
      description: "Schedule and manage online classes.",
      link: "/admin/online-classes",
      color: "bg-purple-600",
    },
    {
      title: "Fee Management",
      description: "Manage student fee records and payments.",
      link: "/admin/fee-student",
      color: "bg-yellow-500",
    },
    {
      title: "Reports",
      description: "View analytics and export data.",
      link: "/admin/reports",
      color: "bg-red-600",
    },
  ];

  const handleToggle = (title) => {
    if (!isSuperAdmin) return;
    setEnabled((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Super Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`rounded-xl shadow-lg p-8 flex flex-col justify-between ${card.color} text-white hover:scale-105 transition cursor-pointer relative`}
              style={{ opacity: enabled[card.title] ? 1 : 0.5, pointerEvents: enabled[card.title] ? "auto" : "none" }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="mb-4">{card.description}</p>
              </div>
              <button
                className={`bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition font-semibold mb-2 ${!enabled[card.title] ? "cursor-not-allowed opacity-60" : ""}`}
                disabled={!enabled[card.title]}
                onClick={() => enabled[card.title] && router.push(card.link)}
              >
                Go to {card.title}
              </button>
              {isSuperAdmin && (
                <button
                  type="button"
                  onClick={() => handleToggle(card.title)}
                  className={`absolute top-4 right-4 px-3 py-1 rounded text-xs font-bold transition ${
                    enabled[card.title]
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {enabled[card.title] ? "Disable" : "Enable"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
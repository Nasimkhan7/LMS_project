'use client';
import React, { useState } from 'react'

const Home = () => {
  const [dark, setDark] = useState(false);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
        {/* Navbar */}
        <nav className="bg-blue-600 dark:bg-gray-900 px-8 py-4 flex items-center justify-between shadow">
          <span className="text-white font-bold text-2xl tracking-wide">LMS Portal</span>
          <div className="flex gap-6 items-center">
            <a href="/student-dashboard" className="text-blue-100 hover:text-white font-semibold transition dark:text-gray-300 dark:hover:text-white">Student</a>
            <a href="/admin" className="text-blue-100 hover:text-white font-semibold transition dark:text-gray-300 dark:hover:text-white">Admin</a>
            <a href="/super-admin" className="text-blue-100 hover:text-white font-semibold transition dark:text-gray-300 dark:hover:text-white">Super Admin</a>
            <button
              onClick={() => setDark(!dark)}
              className="ml-4 px-3 py-1 rounded bg-white dark:bg-gray-700 text-blue-600 dark:text-yellow-400 font-bold shadow hover:bg-blue-100 dark:hover:bg-gray-600 transition"
              aria-label="Toggle dark mode"
            >
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </nav>
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 bg-transparent">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-10 max-w-3xl w-full text-center transition-colors duration-300 mt-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl font-extrabold text-blue-700 dark:text-yellow-400 mb-4">Welcome to LMS</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                Your Learning Management System for Students, Teachers, and Admins.
              </p>
              <a href="#services" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Explore Services</a>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
                alt="LMS Hero"
                className="rounded-xl shadow-lg w-full max-w-xs md:max-w-sm object-cover"
              />
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section id="services" className="py-16 bg-blue-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-yellow-400 mb-10">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a
                href="/student-dashboard"
                className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 flex flex-col items-center transition cursor-pointer hover:scale-105"
              >
                <span className="text-blue-600 dark:text-yellow-400 text-4xl mb-4">🎓</span>
                <h3 className="font-bold text-xl mb-2 text-blue-700 dark:text-yellow-400">Student Portal</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">View syllabus, attendance, notices, and more.</p>
              </a>
              <a
                href="/admin"
                className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 flex flex-col items-center transition cursor-pointer hover:scale-105"
              >
                <span className="text-green-600 dark:text-green-400 text-4xl mb-4">👩‍🏫</span>
                <h3 className="font-bold text-xl mb-2 text-green-700 dark:text-green-400">Admin Portal</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Manage students, teachers, classes, and reports.</p>
              </a>
              <a
                href="/super-admin"
                className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 flex flex-col items-center transition cursor-pointer hover:scale-105"
              >
                <span className="text-purple-600 dark:text-purple-400 text-4xl mb-4">🛡️</span>
                <h3 className="font-bold text-xl mb-2 text-purple-700 dark:text-purple-400">Super Admin</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Control all features and permissions.</p>
              </a>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-yellow-400 mb-8">About LMS Portal</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
              LMS Portal is designed to streamline learning and management for schools and colleges. 
              Our platform provides easy access to academic resources, attendance tracking, and communication tools for students, teachers, and administrators.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <div className="bg-blue-100 dark:bg-gray-800 rounded-lg p-6 shadow w-full md:w-1/2">
                <h3 className="font-semibold text-blue-700 dark:text-yellow-400 mb-2">Why Choose Us?</h3>
                <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
                  <li>Easy to use interface</li>
                  <li>Secure and reliable</li>
                  <li>Comprehensive features</li>
                  <li>Responsive support</li>
                </ul>
              </div>
              <div className="bg-green-100 dark:bg-gray-800 rounded-lg p-6 shadow w-full md:w-1/2">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To empower educational institutions with modern technology, making learning and management efficient, transparent, and accessible for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-blue-600 dark:bg-gray-900 text-blue-100 dark:text-gray-300 py-4 text-center mt-10 rounded-t-xl shadow transition-colors duration-300">
          &copy; {new Date().getFullYear()} LMS Portal. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Home;
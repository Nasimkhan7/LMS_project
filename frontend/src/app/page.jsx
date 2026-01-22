'use client';
import React, { useState } from 'react'

const Home = () => {
  const [dark, setDark] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Welcome to LMS Portal",
      message: "Explore the new features and updates.",
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    },
    {
      id: 2,
      title: "System Maintenance",
      message: "Scheduled maintenance on Sunday at 2:00 AM.",
      expiresAt: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(), // 2 days from now
    },
  ];

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* Navbar */}
        <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-gray-800 dark:text-white font-bold text-xl tracking-wide">LMS Portal</span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="/student-dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">Student</a>
            <a href="/admin" className="text-gray-600 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">Admin</a>
            <a href="/super-admin" className="text-gray-600 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">Super Admin</a>
            <button
              onClick={() => setDark(!dark)}
              className="ml-4 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 font-medium shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
                    Welcome to <span className="text-blue-600 dark:text-blue-400">LMS</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    Your comprehensive Learning Management System for Students, Teachers, and Administrators. 
                    Experience seamless education management with modern tools and intuitive design.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="#services" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                      Explore Services
                    </a>
                    <a href="#about" className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all duration-200">
                      Learn More
                    </a>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
                      alt="LMS Hero"
                      className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl">🎓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="px-6 mb-8">
          <div className="max-w-4xl mx-auto">
            {notifications
              .filter(n => new Date() < new Date(n.expiresAt))
              .map(n => (
                <div key={n.id} className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl">📢</span>
                    <div>
                      <div className="font-semibold text-amber-800 dark:text-amber-300">{n.title}</div>
                      <div className="text-amber-700 dark:text-amber-200 mt-1">{n.message}</div>
                      <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                        Expires: {new Date(n.expiresAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-6 py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Discover powerful tools designed to enhance your educational experience
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Student Portal */}
              <a
                href="/student-dashboard"
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-blue-600 dark:text-blue-400 text-3xl">🎓</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Student Portal</h3>
                  <p className="text-gray-600 dark:text-gray-300">Access syllabus, attendance, assignments, and academic progress tracking.</p>
                </div>
              </a>

              {/* Admin Portal */}
              <a
                href="/admin/dashboard"
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-green-600 dark:text-green-400 text-3xl">👩‍🏫</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Admin Portal</h3>
                  <p className="text-gray-600 dark:text-gray-300">Manage students, teachers, classes, schedules, and generate comprehensive reports.</p>
                </div>
              </a>

              {/* Super Admin Portal */}
              <a
                href="/super-admin"
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-purple-600 dark:text-purple-400 text-3xl">🛡️</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Super Admin</h3>
                  <p className="text-gray-600 dark:text-gray-300">Complete system control with advanced permissions and analytics.</p>
                </div>
              </a>

              {/* Teacher Portal */}
              <a
                href="/teachers"
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-yellow-600 dark:text-yellow-400 text-3xl">📘</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Teacher Portal</h3>
                  <p className="text-gray-600 dark:text-gray-300">Manage classes, assignments, and interact with students seamlessly.</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">About LMS Portal</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                LMS Portal is designed to revolutionize education management for schools and colleges. 
                Our platform combines cutting-edge technology with user-friendly design to create an exceptional learning environment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">⭐</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white">Why Choose Us?</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Intuitive and modern interface
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Enterprise-grade security
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Comprehensive feature set
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    24/7 dedicated support
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To empower educational institutions with innovative technology solutions, making learning and 
                  administration more efficient, transparent, and accessible. We believe in creating tools that 
                  inspire growth and foster educational excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 mt-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <span className="text-white font-bold text-xl">LMS Portal</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  Revolutionizing education management with modern technology and user-centric design.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/student-dashboard" className="text-gray-400 hover:text-white transition-colors">Student Portal</a></li>
                  <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Portal</a></li>
                  <li><a href="/super-admin" className="text-gray-400 hover:text-white transition-colors">Super Admin</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} LMS Portal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home;
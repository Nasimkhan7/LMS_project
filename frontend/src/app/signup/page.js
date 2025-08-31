'use client';
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Add Google authentication
const handleGoogleSignup = async () => {
  window.location.href = "/api/auth/google"; // Your backend Google OAuth endpoint
};

const initialState = { name: "", email: "", password: "" };

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});

export default function SignupPage() {
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (values, { resetForm }) => {
    setError("");
    setStatus("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("Signup successful!");
        resetForm();
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed.");
      }
    } catch {
      setError("Network error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <Field
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
          <div className="my-4 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.2c-1.5 4-5.2 6.9-9.2 6.9-5.5 0-10-4.5-10-10s4.5-10 10-10c2.4 0 4.6.9 6.3 2.3l6.1-6.1C34.1 7.6 29.3 5.5 24 5.5 13.5 5.5 5 14 5 24.5S13.5 43.5 24 43.5c10.5 0 19-8.5 19-19 0-1.3-.1-2.5-.4-3.7z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.7 4.9C14.7 16.1 19 13.5 24 13.5c2.4 0 4.6.9 6.3 2.3l6.1-6.1C34.1 7.6 29.3 5.5 24 5.5c-6.2 0-11.5 3.1-14.7 7.9z"/>
              <path fill="#4CAF50" d="M24 43.5c5.3 0 10.1-2 13.7-5.3l-6.3-5.2c-1.8 1.2-4.1 1.9-6.6 1.9-4 0-7.7-2.9-9.2-6.9l-6.7 5.2C8.5 39.9 15.7 43.5 24 43.5z"/>
              <path fill="#1976D2" d="M43.6 20.5h-1.9V20H24v8h11.2c-.7 2-2.1 3.8-3.9 5l6.3 5.2c3.6-3.3 5.7-8.1 5.7-13.2 0-1.3-.1-2.5-.4-3.7z"/>
            </svg>
            Sign Up with Google
          </button>
          {status && <p className="text-green-600 text-center mt-4">{status}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </Form>
      </Formik>
    </div>
  );
}
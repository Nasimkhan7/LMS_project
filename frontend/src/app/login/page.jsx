'use client';
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialState = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginPage() {
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (values, { resetForm }) => {
    setError("");
    setStatus("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("Login successful!");
        resetForm();
      } else {
        const data = await res.json();
        setError(data.message || "Login failed.");
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
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
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
            Login
          </button>
          {status && <p className="text-green-600 text-center mt-4">{status}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </Form>
      </Formik>
    </div>
  );
}
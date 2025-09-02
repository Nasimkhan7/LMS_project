'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  parentName: "",
  parentContact: "",
  grade: "",
  // registrationDate and status are optional, usually set by backend
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.object({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
  }),
  parentName: Yup.string().required("Required"),
  parentContact: Yup.string().required("Required"),
  grade: Yup.string().required("Required"),
});

export default function RegisterStudent() {
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setStatus("");
    setError("");
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`address[${subKey}]`, subValue);
          });
        } else {
          formData.append(key, value);
        }
      });
      if (photo) formData.append("photo", photo);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration/`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Student registered successfully!");
        resetForm();
        setPhoto(null);
        setPreview(null);
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Network error.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Register Student</h2>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Field
                name="firstName"
                placeholder="First Name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="lastName"
                placeholder="Last Name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="dateOfBirth"
                type="date"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                as="select"
                name="gender"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="phone"
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="address.street"
                placeholder="Street"
                value={values.address.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="address.street" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="address.city"
                placeholder="City"
                value={values.address.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="address.city" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="address.state"
                placeholder="State"
                value={values.address.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="address.state" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="address.zip"
                placeholder="ZIP"
                value={values.address.zip}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="address.zip" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="parentName"
                placeholder="Parent Name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="parentName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="parentContact"
                placeholder="Parent Contact"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="parentContact" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="grade"
                placeholder="Grade"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="grade" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="className"
                placeholder="Class"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="className" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="fixedFee"
                type="number"
                placeholder="Fixed Fee"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <ErrorMessage name="fixedFee" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="md:col-span-2 flex flex-col items-center">
              <label
                htmlFor="photo"
                className="block mb-2 font-medium text-gray-700"
              >
                Passport Size Photo
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Passport Preview"
                  className="mt-2 w-24 h-32 object-cover rounded border shadow"
                  style={{ aspectRatio: "3/4" }}
                />
              )}
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Register
              </button>
              {status && <p className="text-green-600 text-center mt-4">{status}</p>}
              {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
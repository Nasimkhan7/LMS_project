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
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Enter valid 10 digit phone").required("Required"),
  address: Yup.object({
    street: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().matches(/^[0-9]{6}$/, "Enter valid 6 digit ZIP").required("Required"),
  }),
  parentName: Yup.string().required("Required"),
  parentContact: Yup.string().matches(/^[0-9]{10}$/, "Enter valid 10 digit phone").required("Required"),
  grade: Yup.string().required("Required"),
});

export default function RegisterStudent() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [step, setStep] = useState(1);

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
      console.log(values);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration/`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        setStatus("Student registered successfully!");
        resetForm();
        setPhoto(null);
        setPreview(null);
        setStep(1);
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Network error.");
    }
  };

  // Advanced input field component
  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    ...props
  }) => (
    <div className="mb-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
        {...props}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center py-10 px-2">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-2xl p-8 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg text-2xl font-bold tracking-wide border-4 border-blue-200">
            Register Student
          </div>
        </div>
        <div className="mt-12">
          <Formik
            initialValues={initialState}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form className="space-y-6" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="First Name" name="firstName" placeholder="Enter first name" />
                    <InputField label="Last Name" name="lastName" placeholder="Enter last name" />
                    <InputField label="Date of Birth" name="dateOfBirth" type="date" />
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        id="gender"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <InputField label="Email" name="email" type="email" placeholder="Enter email" />
                    <InputField label="Phone" name="phone" placeholder="Enter phone number" />
                    <div className="md:col-span-2 flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Street" name="address.street" placeholder="Street address" value={values.address.street} onChange={handleChange} />
                    <InputField label="City" name="address.city" placeholder="City" value={values.address.city} onChange={handleChange} />
                    <InputField label="State" name="address.state" placeholder="State" value={values.address.state} onChange={handleChange} />
                    <InputField label="ZIP" name="address.zip" placeholder="ZIP code" value={values.address.zip} onChange={handleChange} />
                    <InputField label="Parent Name" name="parentName" placeholder="Parent's name" />
                    <InputField label="Parent Contact" name="parentContact" placeholder="Parent's phone number" />
                    <InputField label="Grade" name="grade" placeholder="Grade/Class" />
                    <div className="md:col-span-2 flex flex-col items-center mt-2">
                      <label htmlFor="photo" className="block mb-2 font-medium text-gray-700">
                        Passport Size Photo
                      </label>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
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
                    <div className="md:col-span-2 flex justify-between gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-semibold shadow"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                      >
                        Register
                      </button>
                    </div>
                    <div className="md:col-span-2">
                      {status && <p className="text-green-600 text-center mt-4">{status}</p>}
                      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
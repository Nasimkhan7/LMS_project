'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const AddCourse = () => {
  const [dark, setDark] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const initialValues = {
    courseCode: '',
    courseName: '',
    description: '',
    subject: '',
    grade: '',
    level: '',
    courseType: 'Core',
    teacher: '',
    curriculum: null,
    textbook: {
      title: '',
      author: '',
      isbn: '',
      publisher: '',
      edition: ''
    },
    schedule: {
      days: [],
      timeSlot: {
        startTime: '',
        endTime: ''
      },
      classroom: '',
      duration: 45
    },
    classSize: 30,
    academicYear: '',
    semester: 'Full Year',
    gradingSystem: {
      type: 'Letter',
      scale: 'A-F'
    },
    assessmentWeights: {
      homework: 20,
      classParticipation: 10,
      quizzes: 20,
      tests: 30,
      finalExam: 20
    },
    learningObjectives: [],
    resources: [],
    attendancePolicy: {
      requiredAttendance: 90,
      tardyPolicy: '',
      makeupPolicy: ''
    },
    behaviorPolicy: {
      classroomRules: [],
      disciplinaryActions: []
    },
    parentCommunication: {
      progressReports: {
        frequency: 'Monthly'
      }
    },
    specialNeeds: {
      accommodations: [],
      modifications: []
    }
  };

  const validationSchema = Yup.object({
    courseCode: Yup.string().required('Course code is required'),
    courseName: Yup.string().required('Course name is required'),
    description: Yup.string().required('Description is required'),
    subject: Yup.string().required('Subject is required'),
    grade: Yup.string().required('Grade is required'),
    level: Yup.string().required('Level is required'),
    courseType: Yup.string().required('Course type is required'),
    teacher: Yup.string().required('Teacher is required'),
    classSize: Yup.number().min(1).required('Class size is required'),
    academicYear: Yup.string().required('Academic year is required'),
    assessmentWeights: Yup.object({
      homework: Yup.number().min(0).max(100),
      classParticipation: Yup.number().min(0).max(100),
      quizzes: Yup.number().min(0).max(100),
      tests: Yup.number().min(0).max(100),
      finalExam: Yup.number().min(0).max(100)
    }).test('total-100', 'Assessment weights must total 100%', function(value) {
      const total = value.homework + value.classParticipation + value.quizzes + value.tests + value.finalExam;
      return total === 100;
    })
  });

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Physical Education",
    "Art",
    "Music",
    "Foreign Language",
    "Health Education",
    "Life Skills",
    "Other"
  ];

  const grades = [
    "Kindergarten",
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
    "Grade 11", "Grade 12"
  ];

  const levels = ["Elementary", "Middle School", "High School"];
  const courseTypes = ["Core", "Elective", "Advanced", "Remedial", "Honors", "AP"];
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const semesters = ["Fall", "Spring", "Summer", "Full Year"];
  const gradingTypes = ["Letter", "Percentage", "Points", "Pass/Fail"];
  const progressFrequencies = ["Weekly", "Bi-weekly", "Monthly", "Quarterly"];
  const resourceTypes = ["Textbook", "Workbook", "Digital Resource", "Video", "Website", "Software", "Other"];

  const handleSubmit = async (values, { setStatus, setSubmitting, resetForm }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Course added successfully!' });
        resetForm();
        setCurrentStep(1);
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || 'Failed to add course' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to safely get nested values
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  };

  const InputField = ({ label, name, type = "text", required = false, options = null, ...props }) => (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {options ? (
            <select
              {...field}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all"
              {...props}
            >
              <option value="">Select {label}</option>
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              {...field}
              type={type}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              {...props}
            />
          )}
          {meta.touched && meta.error && (
            <div className="text-red-500 text-sm mt-1">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Add New Course</h1>
              <button
                onClick={() => setDark(!dark)}
                className="ml-4 p-2 rounded-lg bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-all duration-200"
              >
                <span className="text-xl">{dark ? "🌙" : "☀️"}</span>
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Create and configure a new course for your school</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-1 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2 space-x-6 text-sm">
              <span className={currentStep >= 1 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500'}>Basic Info</span>
              <span className={currentStep >= 2 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500'}>Schedule</span>
              <span className={currentStep >= 3 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500'}>Assessment</span>
              <span className={currentStep >= 4 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500'}>Resources</span>
              <span className={currentStep >= 5 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500'}>Policies</span>
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={false}
            >
              {({ values, setFieldValue, status, isSubmitting }) => (
                <Form>
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-2xl">📝</span>
                        Basic Course Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField 
                          label="Course Code" 
                          name="courseCode" 
                          required 
                          placeholder="e.g., MATH5, ENG7"
                        />
                        <InputField 
                          label="Course Name" 
                          name="courseName" 
                          required 
                          placeholder="e.g., Mathematics Grade 5"
                        />
                        <InputField 
                          label="Subject" 
                          name="subject" 
                          options={subjects} 
                          required 
                        />
                        <InputField 
                          label="Grade" 
                          name="grade" 
                          options={grades} 
                          required 
                        />
                        <InputField 
                          label="Level" 
                          name="level" 
                          options={levels} 
                          required 
                        />
                        <InputField 
                          label="Course Type" 
                          name="courseType" 
                          options={courseTypes} 
                          required 
                        />
                        <InputField 
                          label="Class Size" 
                          name="classSize" 
                          type="number" 
                          min="1" 
                          required 
                        />
                        <InputField 
                          label="Academic Year" 
                          name="academicYear" 
                          required 
                          placeholder="e.g., 2024-2025"
                        />
                        <InputField 
                          label="Semester" 
                          name="semester" 
                          options={semesters} 
                          required 
                        />
                        <InputField 
                          label="Teacher ID" 
                          name="teacher" 
                          required 
                          placeholder="Enter teacher ID"
                        />
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Course Description <span className="text-red-500">*</span>
                        </label>
                        <Field name="description">
                          {({ field, meta }) => (
                            <>
                              <textarea
                                {...field}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                                placeholder="Enter detailed course description..."
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                              )}
                            </>
                          )}
                        </Field>
                      </div>

                      {/* Textbook Information */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Textbook Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField label="Title" name="textbook.title" placeholder="Textbook title" />
                          <InputField label="Author" name="textbook.author" placeholder="Author name" />
                          <InputField label="ISBN" name="textbook.isbn" placeholder="ISBN number" />
                          <InputField label="Publisher" name="textbook.publisher" placeholder="Publisher name" />
                          <InputField label="Edition" name="textbook.edition" placeholder="Edition" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Schedule */}
                  {currentStep === 2 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-2xl">🗓️</span>
                        Course Schedule
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                            Class Days
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {weekDays.map(day => (
                              <label key={day} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Field
                                  type="checkbox"
                                  name="schedule.days"
                                  value={day}
                                  className="text-blue-600"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{day}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <InputField 
                            label="Classroom" 
                            name="schedule.classroom" 
                            placeholder="e.g., Room 101"
                          />
                          <InputField 
                            label="Duration (minutes)" 
                            name="schedule.duration" 
                            type="number" 
                            min="30" 
                            max="120"
                          />
                        </div>
                        <InputField 
                          label="Start Time" 
                          name="schedule.timeSlot.startTime" 
                          type="time"
                        />
                        <InputField 
                          label="End Time" 
                          name="schedule.timeSlot.endTime" 
                          type="time"
                        />
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Upload Curriculum (Optional)
                        </label>
                        <input
                          type="file"
                          name="curriculum"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setFieldValue('curriculum', e.target.files[0] || null)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Assessment & Grading */}
                  {currentStep === 3 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Assessment & Grading
                      </h2>
                      
                      {/* Grading System */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Grading System</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField 
                            label="Grading Type" 
                            name="gradingSystem.type" 
                            options={gradingTypes}
                          />
                          <InputField 
                            label="Scale" 
                            name="gradingSystem.scale" 
                            placeholder="e.g., A-F, 0-100"
                          />
                        </div>
                      </div>

                      {/* Assessment Weights */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Assessment Weights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <InputField 
                            label="Homework (%)" 
                            name="assessmentWeights.homework" 
                            type="number" 
                            min="0" 
                            max="100"
                          />
                          <InputField 
                            label="Class Participation (%)" 
                            name="assessmentWeights.classParticipation" 
                            type="number" 
                            min="0" 
                            max="100"
                          />
                          <InputField 
                            label="Quizzes (%)" 
                            name="assessmentWeights.quizzes" 
                            type="number" 
                            min="0" 
                            max="100"
                          />
                          <InputField 
                            label="Tests (%)" 
                            name="assessmentWeights.tests" 
                            type="number" 
                            min="0" 
                            max="100"
                          />
                          <InputField 
                            label="Final Exam (%)" 
                            name="assessmentWeights.finalExam" 
                            type="number" 
                            min="0" 
                            max="100"
                          />
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Total: {Object.values(values.assessmentWeights || {}).reduce((sum, val) => sum + Number(val || 0), 0)}%
                            {Object.values(values.assessmentWeights || {}).reduce((sum, val) => sum + Number(val || 0), 0) !== 100 && 
                              <span className="text-red-500 ml-2">⚠️ Should equal 100%</span>
                            }
                          </p>
                        </div>
                        <ErrorMessage name="assessmentWeights" component="div" className="text-red-500 text-sm mt-2" />
                      </div>

                      {/* Learning Objectives */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Learning Objectives</h3>
                        <FieldArray name="learningObjectives">
                          {({ push, remove }) => (
                            <div className="space-y-4">
                              {(values.learningObjectives || []).map((objective, index) => (
                                <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                                  <div className="grid grid-cols-1 gap-4">
                                    <Field
                                      type="text"
                                      name={`learningObjectives[${index}].objective`}
                                      placeholder="Learning Objective"
                                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                    />
                                    <Field
                                      as="textarea"
                                      name={`learningObjectives[${index}].description`}
                                      placeholder="Description"
                                      rows="2"
                                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                                  >
                                    Remove Objective
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => push({ objective: '', description: '', skills: [] })}
                                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
                              >
                                + Add Learning Objective
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Resources */}
                  {currentStep === 4 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-2xl">📖</span>
                        Course Resources
                      </h2>
                      <FieldArray name="resources">
                        {({ push, remove }) => (
                          <div className="space-y-4">
                            {(values.resources || []).map((resource, index) => (
                              <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Field
                                    type="text"
                                    name={`resources[${index}].title`}
                                    placeholder="Resource Title"
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                  />
                                  <Field
                                    as="select"
                                    name={`resources[${index}].type`}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                  >
                                    {resourceTypes.map(type => (
                                      <option key={type} value={type}>{type}</option>
                                    ))}
                                  </Field>
                                  <Field
                                    type="url"
                                    name={`resources[${index}].url`}
                                    placeholder="URL/Link"
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                  />
                                  <Field
                                    type="text"
                                    name={`resources[${index}].description`}
                                    placeholder="Description"
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                  />
                                </div>
                                <div className="mt-2 flex items-center">
                                  <Field
                                    type="checkbox"
                                    name={`resources[${index}].isRequired`}
                                    className="mr-2"
                                  />
                                  <label className="text-sm text-gray-700 dark:text-gray-300">Required Resource</label>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove Resource
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ title: '', type: 'Textbook', url: '', description: '', isRequired: false })}
                              className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
                            >
                              + Add Resource
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  )}

                  {/* Step 5: Policies */}
                  {currentStep === 5 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-2xl">📋</span>
                        Course Policies
                      </h2>
                      
                      {/* Attendance Policy */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Attendance Policy</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <InputField 
                            label="Required Attendance (%)" 
                            name="attendancePolicy.requiredAttendance" 
                            type="number" 
                            min="0" 
                            max="100"
                          />
                          <InputField 
                            label="Tardy Policy" 
                            name="attendancePolicy.tardyPolicy" 
                            placeholder="Tardy policy description"
                          />
                          <InputField 
                            label="Makeup Policy" 
                            name="attendancePolicy.makeupPolicy" 
                            placeholder="Makeup policy description"
                          />
                        </div>
                      </div>

                      {/* Parent Communication */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Parent Communication</h3>
                        <InputField 
                          label="Progress Report Frequency" 
                          name="parentCommunication.progressReports.frequency" 
                          options={progressFrequencies}
                        />
                      </div>

                      {/* Classroom Rules */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Classroom Rules</h3>
                        <FieldArray name="behaviorPolicy.classroomRules">
                          {({ push, remove }) => (
                            <div className="space-y-2">
                              {(values.behaviorPolicy?.classroomRules || []).map((rule, index) => (
                                <div key={index} className="flex gap-2">
                                  <Field
                                    type="text"
                                    name={`behaviorPolicy.classroomRules[${index}]`}
                                    placeholder="Classroom rule"
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="px-3 py-2 text-red-600 hover:text-red-800"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => push('')}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                + Add Classroom Rule
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>

                      {/* Special Needs Accommodations */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Special Needs Support</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                              Accommodations
                            </label>
                            <FieldArray name="specialNeeds.accommodations">
                              {({ push, remove }) => (
                                <div className="space-y-2">
                                  {(values.specialNeeds?.accommodations || []).map((accommodation, index) => (
                                    <div key={index} className="flex gap-2">
                                      <Field
                                        type="text"
                                        name={`specialNeeds.accommodations[${index}]`}
                                        placeholder="Accommodation"
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="px-3 py-2 text-red-600 hover:text-red-800"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => push('')}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                  >
                                    + Add Accommodation
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                              Modifications
                            </label>
                            <FieldArray name="specialNeeds.modifications">
                              {({ push, remove }) => (
                                <div className="space-y-2">
                                  {(values.specialNeeds?.modifications || []).map((modification, index) => (
                                    <div key={index} className="flex gap-2">
                                      <Field
                                        type="text"
                                        name={`specialNeeds.modifications[${index}]`}
                                        placeholder="Modification"
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="px-3 py-2 text-red-600 hover:text-red-800"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => push('')}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                  >
                                    + Add Modification
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Creating...' : 'Create Course'}
                      </button>
                    )}
                  </div>

                  {/* Status Messages */}
                  {status && (
                    <div className="px-8 pb-6">
                      <div className={`p-4 border rounded-lg ${
                        status.type === 'success' 
                          ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600' 
                          : 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600'
                      }`}>
                        <p className={`text-center flex items-center justify-center gap-2 ${
                          status.type === 'success' 
                            ? 'text-green-700 dark:text-green-300' 
                            : 'text-red-700 dark:text-red-300'
                        }`}>
                          <span className="text-xl">{status.type === 'success' ? '✅' : '❌'}</span>
                          {status.message}
                        </p>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/admin"
              className="px-6 py-3 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-all duration-200 flex items-center gap-2"
            >
              <span>⬅️</span>
              Back to Admin
            </a>
            <a
              href="/admin/view-courses"
              className="px-6 py-3 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-all duration-200 flex items-center gap-2"
            >
              <span>👁️</span>
              View All Courses
            </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
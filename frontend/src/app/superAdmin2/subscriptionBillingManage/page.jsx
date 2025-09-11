'use client';
import React, { useState } from "react";

const tierTemplates = {
  Basic: {
    price: 499,
    duration: 30,
    features: "Up to 100 students, 10 teachers",
    studentLimit: 100,
    storageLimit: 5,
  },
  Premium: {
    price: 1499,
    duration: 90,
    features: "Up to 500 students, 50 teachers",
    studentLimit: 500,
    storageLimit: 20,
  },
  Enterprise: {
    price: 2999,
    duration: 365,
    features: "Unlimited students, 200 teachers",
    studentLimit: 99999,
    storageLimit: 100,
  },
};

const initialPlans = [
  {
    id: 1,
    name: "Basic",
    price: 499,
    duration: 30,
    features: "Up to 100 students, 10 teachers",
    studentLimit: 100,
    storageLimit: 5,
    paymentStatus: "Paid",
    invoice: "INV-1001",
  },
  {
    id: 2,
    name: "Premium",
    price: 1499,
    duration: 90,
    features: "Up to 500 students, 50 teachers",
    studentLimit: 500,
    storageLimit: 20,
    paymentStatus: "Pending",
    invoice: "INV-1002",
  },
];

export default function SubscriptionBillingManage() {
  const [plans, setPlans] = useState(initialPlans);
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
    studentLimit: "",
    storageLimit: "",
  });
  const [editId, setEditId] = useState(null);
  const [showNotif, setShowNotif] = useState("");
  const [invoiceModal, setInvoiceModal] = useState({ open: false, invoice: "" });

  // Auto update form fields when tier is selected
  const handleTierChange = (e) => {
    const tier = e.target.value;
    setForm((f) => ({
      ...f,
      name: tier,
      ...(tierTemplates[tier] || {}),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editId) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editId
            ? {
                ...p,
                ...form,
                price: Number(form.price),
                duration: Number(form.duration),
                studentLimit: Number(form.studentLimit),
                storageLimit: Number(form.storageLimit),
              }
            : p
        )
      );
      setShowNotif("Plan updated!");
    } else {
      setPlans((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          price: Number(form.price),
          duration: Number(form.duration),
          studentLimit: Number(form.studentLimit),
          storageLimit: Number(form.storageLimit),
          paymentStatus: "Pending",
          invoice: `INV-${1000 + prev.length + 1}`,
        },
      ]);
      setShowNotif("Plan added!");
    }
    setForm({
      name: "",
      price: "",
      duration: "",
      features: "",
      studentLimit: "",
      storageLimit: "",
    });
    setEditId(null);
    setTimeout(() => setShowNotif(""), 2000);
  };

  const handleEdit = (plan) => {
    setForm({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: plan.features,
      studentLimit: plan.studentLimit,
      storageLimit: plan.storageLimit,
    });
    setEditId(plan.id);
  };

  const handleDelete = (id) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    setShowNotif("Plan deleted!");
    if (editId === id) {
      setEditId(null);
      setForm({
        name: "",
        price: "",
        duration: "",
        features: "",
        studentLimit: "",
        storageLimit: "",
      });
    }
    setTimeout(() => setShowNotif(""), 2000);
  };

  const handleInvoice = (invoice) => {
    setInvoiceModal({ open: true, invoice });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative">
      {/* Notification */}
      {showNotif && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-bounce">
          {showNotif}
        </div>
      )}
      {/* Invoice Modal */}
      {invoiceModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Invoice</h3>
            <p className="mb-4">Invoice Number: <span className="font-mono">{invoiceModal.invoice}</span></p>
            <button
              onClick={() => setInvoiceModal({ open: false, invoice: "" })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Subscription & Billing Management</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block mb-1 font-semibold">Tier Name</label>
          <select
            name="name"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.name}
            onChange={handleTierChange}
            required
          >
            <option value="">Select Tier</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Price (₹)</label>
          <input
            type="number"
            name="price"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.price}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Duration (days)</label>
          <input
            type="number"
            name="duration"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.duration}
            onChange={handleChange}
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Features</label>
          <input
            type="text"
            name="features"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.features}
            onChange={handleChange}
            required
            placeholder="e.g. Up to 100 students, 10 teachers"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Student Limit</label>
          <input
            type="number"
            name="studentLimit"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.studentLimit}
            onChange={handleChange}
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Storage Limit (GB)</label>
          <input
            type="number"
            name="storageLimit"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.storageLimit}
            onChange={handleChange}
            required
            min={1}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update Tier" : "Add Tier"}
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Subscription Tiers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b dark:border-gray-700">Tier</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Price</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Duration</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Features</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Student Limit</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Storage (GB)</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Payment</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Invoice</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="text-center">
                  <td className="py-2 px-3 border-b dark:border-gray-700">{plan.name}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">₹{plan.price}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{plan.duration} days</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{plan.features}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{plan.studentLimit}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{plan.storageLimit}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      plan.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {plan.paymentStatus}
                    </span>
                  </td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    <button
                      onClick={() => handleInvoice(plan.invoice)}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
                    >
                      View
                    </button>
                  </td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-4 text-gray-400">
                    No subscription tiers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function AddTeacher() {
  const [form, setForm] = useState({
    t_id: "",
    name: "",
    email: "",
    maxLoad: "",
    subjectExpertise: "",
    availableDays: [],   
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        maxLoad: Number(form.maxLoad),

        subjectExpertise:
          typeof form.subjectExpertise === "string"
            ? form.subjectExpertise
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean)
            : form.subjectExpertise,

        availableDays: form.availableDays,
      };

      const res = await fetch("/api/teacher/add-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Teacher added successfully!");

      setForm({
        t_id: "",
        name: "",
        email: "",
        maxLoad: "",
        subjectExpertise: "",
        availableDays: [],
      });
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div className=" w-full">
      <div className="w-full p-6 bg-white mx-auto space-y-2 rounded">
        <h1 className="text-2xl font-bold">Add New Teacher</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 py-5 rounded-xl border-gray-200 text-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label className="block font-semibold text-gray-700 mb-1">
                Teacher ID
              </label>  
              <input
                name="t_id"
                value={form.t_id}
                onChange={handleChange}
                placeholder="e.g. T105"
                className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label className="block font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@university.edu"
                className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block font-semibold text-gray-700 mb-1">
                Max Load (hrs/week)
              </label>
              <input
                name="maxLoad"
                value={form.maxLoad}
                onChange={handleChange}
                type="number"
                className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Subject Expertise
            </label>
            <input
              name="subjectExpertise"
              value={form.subjectExpertise}
              onChange={handleChange}
              placeholder="CS101 - Java, CS301 - OS"
              className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate with commas
            </p>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Available Days
            </label>

            <div className="grid grid-cols-6 gap-2 bg-gray-200 p-2 rounded text-sm text-gray-700">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.availableDays.includes(day)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm((prev) => ({
                          ...prev,
                          availableDays: [...prev.availableDays, day],
                        }));
                      } else {
                        setForm((prev) => ({
                          ...prev,
                          availableDays: prev.availableDays.filter(
                            (d) => d !== day
                          ),
                        }));
                      }
                    }}
                    className="h-4 w-4 accent-indigo-600"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <div className="w-full mt-16 flex items-center justify-center">
            <button
              type="submit"
              className="flex items-center cursor-pointer bg-indigo-600 text-white p-2 px-3 rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700 hover:shadow transition"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

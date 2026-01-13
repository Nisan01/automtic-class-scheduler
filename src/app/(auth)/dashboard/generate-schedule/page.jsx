"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ReChecker from "@/components/ScheduleReChecker/ReChecker";

export default function CreateSchedule() {
  const [openReChecker, setOpenRechecker] = useState(false);
  const [form, setForm] = useState({
    breakEnabled: false,
    type: "",
    numbers: "",
    workingDays: [],
    startTime: "",
    endTime: "",
    breakName: "",
    breakStart: "",
    breakEnd: "",
    breakDuration: "",
    periodDuration: "",
  });
  const [breakError, setBreakError] = useState("");
  const [periodError, setPeriodError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleWorkingDaysChange = (day) => {
    setForm((prev) => {
      const exists = prev.workingDays.includes(day);
      const newWorkingDays = exists
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day];
      return { ...prev, workingDays: newWorkingDays };
    });
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // -------- Break Validation --------
  useEffect(() => {
    if (!form.breakEnabled) {
      setBreakError("");
      return;
    }
    if (
      !form.breakStart ||
      !form.breakDuration ||
      !form.periodDuration ||
      !form.startTime ||
      !form.endTime
    ) {
      setBreakError("");
      return;
    }

    const startMin = timeToMinutes(form.startTime);
    const endMin = timeToMinutes(form.endTime);
    const breakStartMin = timeToMinutes(form.breakStart);
    const breakEndMin = breakStartMin + form.breakDuration;

    if (breakStartMin < startMin + form.periodDuration) {
      setBreakError("Break must start after the first period ends.");
      return;
    }

    if (breakEndMin > endMin) {
      setBreakError("Break cannot end after schedule end time.");
      return;
    }

    setBreakError("");
  }, [
    form.breakEnabled,
    form.breakStart,
    form.breakDuration,
    form.periodDuration,
    form.startTime,
    form.endTime,
  ]);

  // -------- Period Duration Validation --------
  useEffect(() => {
    if (!form.startTime || !form.endTime || !form.periodDuration) {
      setPeriodError("");
      return;
    }

    const startMin = timeToMinutes(form.startTime);
    const endMin = timeToMinutes(form.endTime);
    const period = form.periodDuration;

    let valid = true;

    if (period > endMin - startMin) {
      valid = false; // period is longer than total schedule
    }

    if (form.breakEnabled && form.breakStart && form.breakDuration) {
      const breakStartMin = timeToMinutes(form.breakStart);
      const breakEndMin = breakStartMin + form.breakDuration;

      const beforeBreak = breakStartMin - startMin;
      const afterBreak = endMin - breakEndMin;

      if (beforeBreak < period || afterBreak < period) {
        valid = false; // not enough time for full period in segments
      }
    }

    if (!valid) {
      setPeriodError("Period duration does not fit within schedule.");
    } else {
      setPeriodError("");
    }
  }, [
    form.startTime,
    form.endTime,
    form.periodDuration,
    form.breakEnabled,
    form.breakStart,
    form.breakDuration,
  ]);

  const isFormValid = () => {
    if (!form.type) return false;
    if (!form.numbers) return false;
    if (!form.startTime) return false;
    if (!form.endTime) return false;
    if (form.workingDays.length === 0) return false;
    if (!form.periodDuration) return false;

    if (form.breakEnabled) {
      if (!form.breakName || !form.breakStart || !form.breakDuration) return false;
      if (breakError) return false;
    }

    if (periodError) return false;

    return true;
  };

  const nextClickHandler = () => {
    if (!isFormValid()) return;
    setOpenRechecker(true);
    toast.success("Form data logged in console!");
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full relative">
      <div className="w-full p-6 bg-white mx-auto space-y-4 rounded">
        <h1 className="text-2xl font-bold">Create Schedule</h1>

        {/* Type and Number */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 gap-2">
            <label className="block font-semibold text-gray-700 mb-1">Type:</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            >
              <option value="">Select Type</option>
              <option value="Semester">Semester</option>
              <option value="Class">Class</option>
            </select>
          </div>

          <div className="flex-1 flex-col gap-2">
            <label className="block font-semibold text-gray-700 mb-1">Number of Class/Sem</label>
            <input
              type="number"
              name="numbers"
              value={form.numbers}
              placeholder="1,2,3"
              onChange={handleChange}
              className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Working Days */}
        <div className="flex flex-col">
          <label className="block font-semibold text-gray-700 mb-1">Working Days:</label>
          <div className="flex gap-4 flex-wrap">
            {days.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.workingDays.includes(day)}
                  onChange={() => handleWorkingDaysChange(day)}
                  className="h-4 w-4 accent-indigo-600"
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* Start/End Time & Period */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">Period Duration (min)</label>
            <input
              type="number"
              name="periodDuration"
              value={form.periodDuration}
              onChange={handleChange}
              className="w-full p-2 shadow rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            />
            {periodError && <p className="text-red-600 text-sm mt-1">{periodError}</p>}
          </div>
        </div>

        {/* Break */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Break / Lunch</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.breakEnabled === true}
                onChange={() => setForm((prev) => ({ ...prev, breakEnabled: true }))}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.breakEnabled === false}
                onChange={() => setForm((prev) => ({ ...prev, breakEnabled: false }))}
              />
              No
            </label>
          </div>

          {form.breakEnabled && (
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="breakName"
                placeholder="Break Name"
                value={form.breakName}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                type="time"
                name="breakStart"
                value={form.breakStart}
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="breakDuration"
                placeholder="Duration (min)"
                value={form.breakDuration}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>
          )}
          {breakError && <p className="text-red-600 text-sm mt-1">{breakError}</p>}
        </div>

        {/* Next Button */}
        <div className="w-full mt-6 flex justify-end">
          <button
            type="button"
            onClick={nextClickHandler}
            disabled={!isFormValid()}
            className={`bg-indigo-600 text-white cursor-pointer p-2 px-6 rounded-lg font-semibold shadow transition ${
              !isFormValid() ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {openReChecker && (
        <ReChecker
          scheduleData={form}
          onOpen={openReChecker}
          onClose={() => setOpenRechecker(false)}
        />
      )}
    </div>
  );
}

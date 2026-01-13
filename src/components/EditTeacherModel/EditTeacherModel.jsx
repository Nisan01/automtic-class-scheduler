"use client";
import { useState } from "react";
import { Button } from "../ui/Button";
import { X } from 'lucide-react';

export default function EditTeacherModal({ isOpen, onClose, teacher, onSave }) {
  if (!isOpen || !teacher) return null;

  const [formData, setFormData] = useState({
    name: teacher.name,
    email: teacher.email,
    maxLoad: teacher.maxLoad,
    subjectExpertise: teacher.subjectExpertise.join(", "),
    availableDays: teacher.availableDays.join(", "),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({
      ...formData,
      subjectExpertise: formData.subjectExpertise.split(",").map(i => i.trim()),
      availableDays: formData.availableDays.split(",").map(i => i.trim()),
    });
  };

  return (
    <div className="absolute inset-0 -top-[18rem] bg-black/40 flex items-center justify-center z-50">


      <div className="backdrop-blur-md bg-white/70 p-6 px-10 rounded-lg w-[400px] shadow-md space-y-3 border border-white/40">
        <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Edit Teacher</h2>
         <X  className="cursor-pointer" onClick={onClose}/>
         </div>
        <div className="space-y-1">
          <label className="font-medium text-sm">Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-sm">Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-sm">Max Load:</label>
          <input
            name="maxLoad"
            type="number"
            value={formData.maxLoad}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-sm">Subject Expertise:</label>
          <input
            name="subjectExpertise"
            value={formData.subjectExpertise}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-sm">Available Days:</label>
          <input
            name="availableDays"
            value={formData.availableDays}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>

        <div className="flex justify-end gap-2 items-center">
          <Button
            onClick={onClose}
            className="border border-gray-500 bg-transparent text-gray-700 text-sm hover:bg-gray-200"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white text-sm "
          >
            Save
          </Button>
        </div>

      </div>
    </div>
  );
}

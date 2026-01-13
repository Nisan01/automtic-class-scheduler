"use client";
import React from "react";

export default function AdminMessage({ message }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4">
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
}

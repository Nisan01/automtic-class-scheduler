"use client";
import React from "react";

export default function AccessDenied({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
      <strong className="font-bold">Access Denied!</strong>
      <span className="block sm:inline ml-2">{message || "You are not authorized to access this section."}</span>
    </div>
  );
}

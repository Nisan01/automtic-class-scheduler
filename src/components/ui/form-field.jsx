// components/ui/form-field.jsx
import React from "react";
import { Input } from "./input";

export function FormField({ label, error, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input {...props} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

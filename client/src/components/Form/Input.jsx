import React from "react";

export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col w-full">
      <label>{label}</label>
      <input {...props} className="py-1 border-1 pl-1 border-gray-400 rounded-sm"/>
    </div>
  );
}

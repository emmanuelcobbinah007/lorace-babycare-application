import React from "react";

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${className}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

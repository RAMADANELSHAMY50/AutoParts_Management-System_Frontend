import React from "react";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-zinc-300 text-right"
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="
          w-full
          rounded-xl
          border border-zinc-700
          bg-[#1E1E1E]
          px-4
          py-3
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all
          duration-300
          focus:border-indigo-400
          focus:ring-2
          focus:ring-indigo-400/20
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}
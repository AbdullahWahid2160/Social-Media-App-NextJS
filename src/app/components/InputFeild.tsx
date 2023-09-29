import { InputFieldProps } from "@/interfaces/interfaces";
import React from "react";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        value={value} // Bind value to the prop
        onChange={onChange} // Bind onChange to the prop
      />
    </div>
  );
};

export default InputField;

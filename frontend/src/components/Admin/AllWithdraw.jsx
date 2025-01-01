import React, { useState } from "react";

const InlineForm = () => {
  const [firstName, setFirstName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-lg p-6  bg-white rounded-lg shadow-lg">
    {/* Main Heading */}
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Inline Input Example
    </h1>

    {/* Inline Input Section */}
    <div className="flex items-center gap-4">
      {/* Label */}
      <label
        htmlFor="firstName"
        className="text-lg font-medium text-gray-700"
      >
        First Name:
      </label>

      {/* Input */}
      <input
        type="text"
        id="firstName"
        placeholder="Enter your first name"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DD9933] focus:border-[#DD9933]"
      />

      {/* Unit Symbol */}
      <span className="text-lg font-semibold text-gray-600">UITS</span>
    </div>
    <div className="flex items-center gap-4">
      {/* Label */}
      <label
        htmlFor="firstName"
        className="text-lg font-medium text-gray-700"
      >
        First Name:
      </label>

      {/* Input */}
      <input
        type="text"
        id="firstName"
        placeholder="Enter your first name"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DD9933] focus:border-[#DD9933]"
      />

      {/* Unit Symbol */}
      <span className="text-lg font-semibold text-gray-600">UITS</span>
    </div>
    <div className="flex items-center gap-4">
      {/* Label */}
      <label
        htmlFor="firstName"
        className="text-lg font-medium text-gray-700"
      >
        First Name:
      </label>

      {/* Input */}
      <input
        type="text"
        id="firstName"
        placeholder="Enter your first name"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DD9933] focus:border-[#DD9933]"
      />

      {/* Unit Symbol */}
      <span className="text-lg font-semibold text-gray-600">UITS</span>
    </div>
    <div className="flex items-center gap-4">
      {/* Label */}
      <label
        htmlFor="firstName"
        className="text-lg font-medium text-gray-700"
      >
        First Name:
      </label>

      {/* Input */}
      <input
        type="text"
        id="firstName"
        placeholder="Enter your first name"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DD9933] focus:border-[#DD9933]"
      />

      {/* Unit Symbol */}
      <span className="text-lg font-semibold text-gray-600">UITS</span>
    </div>
  </div>
</div>

  );
};

export default InlineForm;

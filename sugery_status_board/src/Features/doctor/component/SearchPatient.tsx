"use client";

import { useState } from "react";
import { usePatientStore } from "@/store/patientStore";

export default function SearchPatient() {
  const [inputId, setInputId] = useState("");
  const [searching, setSearching] = useState(false);

  const findPatientByPatientNumber = usePatientStore(
    (state) => state.findPatientByPatientNumber
  );
  const clearSelectedPatient = usePatientStore(
    (state) => state.clearSelectedPatient
  );

  const handleSearch = async () => {
    const trimmedId = inputId.trim().toUpperCase();

    if (!/^[A-Z0-9]{6}$/.test(trimmedId)) {
      alert("Please enter a valid 6-character Patient ID (letters & numbers only).");
      return;
    }

    try {
      setSearching(true);
      await findPatientByPatientNumber(trimmedId);
    } catch (err) {
      console.error("Error finding patient:", err);
      alert("Unable to find patient. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleClear = () => {
    setInputId("");
    clearSelectedPatient();
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Find Patient</h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter the patient number to look up current information
      </p>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter 6-character Patient ID"
          className="w-full sm:w-auto flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={searching}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${
              searching
                ? "bg-accentSub opacity-70 cursor-not-allowed"
                : "bg-accentMain hover:bg-accentSub"
            }`}
          >
            {searching ? "Searching..." : "Look Up"}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

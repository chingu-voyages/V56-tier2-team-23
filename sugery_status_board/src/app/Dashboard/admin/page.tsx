"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuUserPlus, LuClipboardPlus } from "react-icons/lu";
import { CiSearch, CiSquareRemove } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import ProtectedRoute from "@/components/guards/withAuthRedirect";
import { IPatients } from "@/types/patientStore";

// Utility to generate unique 6-char alphanumeric ID
const generatePatientId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

function PatientInformation() {
  const [patients, setPatients] = useState<IPatients[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPatients>({
    defaultValues: {
      patientNumber: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      phoneNumber: "",
      contactEmail: "",
      status: "Checked In",
    },
  });

  
  const [searchInput, setSearchInput] = useState("");
  const searchQuery = searchInput;


  const [searchResults, setSearchResults] = useState<IPatients[]>([]);
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`/api/patients`);
        if (!res.ok) throw new Error("Failed to fetch patients");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatients();
  }, []);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.trim() !== "") {
        const query = searchInput.toLowerCase();
        const filtered = patients.filter(
          (p) =>
            p.lastName.toLowerCase().includes(query) ||
            p.firstName.toLowerCase().includes(query)
        );
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput, patients]);

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchResults([]);
  };

  const addPatient = (newPatient: IPatients) => {
    setPatients((prev) => [...prev, newPatient]);
  };

 const onSubmit = async (data: IPatients) => {
  if (loading) return;
  setLoading(true);

  try {
    const newPatient = { ...data, patientNumber: generatePatientId() };
    const res = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatient),
    });

    if (!res.ok) throw new Error("Failed to add patient");

    const result = await res.json();
    addPatient(result);
    setFormMessage({ type: "success", text: result.message || "Patient added successfully" });
    reset();
  } catch (error: unknown) {
    let message = "An error occurred";

    if (error instanceof Error) {
      message = error.message;
    }

    setFormMessage({ type: "error", text: message });
  } finally {
    setLoading(false);
  }
};




  return (
    <ProtectedRoute>
      <div className="container mx-auto lg:px-4 px-2 py-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <LuUserPlus className="size-5 lg:size-6 text-accentMain" />
            <h1 className="md:text-2xl font-bold text-viking-950">
              Patient Information Management
            </h1>
          </div>
          <button
            className="bg-viking-700 p-2 rounded-lg lg:hidden text-viking-50 shadow-md hover:bg-viking-800 transition-colors flex justify-center items-center"
            onClick={() => setShowMobileSearch(true)}
          >
            <CiSearch className="stroke-2" />
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* LEFT - Add Patient */}
          <main className="lg:col-span-1 rounded-lg p-3 lg:p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-viking-900">Add New Patient</h2>
              <p className="text-viking-700 text-base">
                Enter patient information to start tracking their surgical progress.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formMessage && (
                <div
                  className={`p-4 rounded-md ${formMessage.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {formMessage.text}
                </div>
              )}

              {/* First & Last Name */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="block text-viking-800 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className="border border-gray-400 rounded-md px-4 py-1"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="lastName" className="block text-viking-800 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="border border-gray-400 rounded-md px-4 py-1"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </section>

              {/* Street Address */}
              <div className="flex flex-col">
                <label htmlFor="streetAddress" className="block text-viking-800 mb-1">
                  Street Address
                </label>
                <input
                  id="streetAddress"
                  className="border border-gray-400 rounded-md px-4 py-1"
                  {...register("streetAddress", { required: "Street address is required" })}
                />
                {errors.streetAddress && (
                  <p className="text-red-600 text-sm mt-1">{errors.streetAddress.message}</p>
                )}
              </div>

              {/* Location Fields */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["city", "state", "country"].map((field) => (
                  <div className="flex flex-col" key={field}>
                    <label htmlFor={field} className="block text-viking-800 mb-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={field}
                      className="border border-gray-400 rounded-md px-4 py-1"
                      {...register(field as keyof IPatients, {
                        required: `${field} is required`,
                      })}
                    />
                    {errors[field as keyof IPatients] && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors[field as keyof IPatients]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </section>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="block text-viking-800 mb-1">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  placeholder="+XXX XXXXXXXXXX"
                  className="border border-gray-400 rounded-md px-4 py-1"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+\d{1,3}\s?[\d\s]{9,15}$/,
                      message: "Invalid phone number format. Use +XXX XXXXXXXXXX",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Contact Email */}
              <div className="flex flex-col">
                <label htmlFor="contactEmail" className="block text-viking-800 mb-1">
                  Contact Email
                </label>
                <input
                  id="contactEmail"
                  placeholder="family@kfc.com"
                  className="border border-gray-400 rounded-md px-4 py-1"
                  {...register("contactEmail", {
                    required: "Contact email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.contactEmail && (
                  <p className="text-red-600 text-sm mt-1">{errors.contactEmail.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-accentMain text-white py-2 rounded-md flex justify-center items-center gap-2 transition-colors w-full font-semibold ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-viking-800"
                  }`}
              >
                <LuClipboardPlus className="size-6" />
                <span>{loading ? "Adding..." : "Add Patient"}</span>
              </button>
            </form>
          </main>

          {/* RIGHT - Search Panel */}
          <div className="hidden lg:block lg:col-span-1 shadow-lg rounded-lg p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-viking-900">Search Patients</h2>
              <p className="text-viking-700 text-base">Find existing patients by last name.</p>
            </div>
            <form className="flex items-center gap-2">
              <input
                className="outline flex-1 rounded-sm px-2 py-1 border border-viking-300 focus:ring-2 focus:ring-viking-500 focus:border-transparent"
                placeholder="Enter last name to search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-accentSub rounded-full p-2 hover:bg-viking-500"
                onClick={() => {
                  if (searchInput.trim() !== "") {
                    const filtered = patients.filter((p) =>
                      p.lastName.toLowerCase().includes(searchInput.toLowerCase())
                    );
                    setSearchResults(filtered);
                  } else {
                    setSearchResults([]);
                  }
                }}
              >
                <CiSearch className="size-6 text-accentMain" />
              </button>
              <button
                type="button"
                onClick={handleClearSearch}
                className="bg-accentSub hover:bg-viking-400 px-2 py-1.5 rounded-sm"
              >
                Clear
              </button>
            </form>

            {searchResults.length > 0 ? (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <LuUserPlus className="size-5 text-accentMain" />
                  <p className="font-semibold">Found {searchResults.length} patient(s)</p>
                </div>
                {searchResults.map((patient) => (
                  <div key={patient.patientNumber} className="bg-viking-50 p-4 rounded-lg shadow-sm">
                    <p className="font-bold">{patient.firstName} {patient.lastName}</p>
                    <p className="text-sm">Patient Number: {patient.patientNumber}</p>
                    <p className="text-sm">Contact: {patient.phoneNumber} | {patient.contactEmail}</p>
                    <p className="text-sm">
                      Address: {patient.streetAddress}, {patient.city}, {patient.state}, {patient.country}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              searchQuery && <p className="mt-6 text-viking-700 text-center">No patients found.</p>
            )}
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="fixed inset-0 bg-viking-950/70 z-50 flex flex-col p-4 pt-20">
            <button
              className="absolute top-4 right-4 text-viking-50 text-3xl"
              onClick={() => setShowMobileSearch(false)}
            >
              <CiSquareRemove />
            </button>
            <h2 className="text-2xl font-bold text-viking-50 mb-6">Search Patients</h2>
            <form className="w-full max-w-md">
              <div className="relative flex items-center">
                <input
                  className="outline flex-1 rounded-sm px-2 py-1 border border-viking-300 focus:ring-2 focus:ring-viking-500 focus:border-transparent"
                  placeholder="Enter last name to search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />              {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 text-viking-50 hover:text-viking-900"
                  >
                    <MdCancel className="text-accentMain size-7" />
                  </button>
                )}
              </div>
            </form>
            {searchResults.length > 0 ? (
              <div className="mt-6 w-full max-w-md">
                <div className="flex items-center gap-2 mb-4 text-viking-50">
                  <LuUserPlus className="size-6" />
                  <p className="font-semibold">Found {searchResults.length} patient(s)</p>
                </div>
                {searchResults.map((patient) => (
                  <div
                    key={patient.patientNumber}
                    className="bg-viking-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-bold text-viking-950">{patient.firstName} {patient.lastName}</p>
                    <p className="text-sm">Patient Number: {patient.patientNumber}</p>
                    <p className="text-sm">Contact: {patient.phoneNumber} | {patient.contactEmail}</p>
                    <p className="text-sm">
                      Address: {patient.streetAddress}, {patient.city}, {patient.state}, {patient.country}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              searchQuery && <p className="mt-6 w-full max-w-md text-viking-50 text-center">No patients found.</p>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default PatientInformation;

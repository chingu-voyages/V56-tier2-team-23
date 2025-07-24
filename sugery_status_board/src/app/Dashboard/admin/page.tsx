"use client";

import {
  SvgSearch,
  SvgUserplus,
  SvgCancel,
  SvgClipboard,
} from "@/components/icons";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePatientStore } from "@/store/patientStore";

interface IFormInput {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  contactEmail: string;
}

interface ISearchFormInput {
  searchQuery: string;
}

interface Patient extends IFormInput {
  patientNumber: string;
}

const generatePatientNumber = (): string => {
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  return Array(6)
    .fill(null)
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join("");
};

function PatientInformation() {
  const addPatient = usePatientStore((state) => state.addPatient);
  const patients = usePatientStore((state) => state.patients);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const patientNumber = generatePatientNumber();
    const patientData: Patient = { ...data, patientNumber };
    addPatient(patientData);
  };

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const {
    register: registerSearch,
    watch,
    setValue,
  } = useForm<ISearchFormInput>();
  const searchQuery = watch("searchQuery");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        const filteredPatients = patients.filter((patient) =>
          patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredPatients);
      } else {
        setSearchResults([]);
      }
    }, 300); // Debounce for 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, patients]);

  const handleClearSearch = () => {
    setValue("searchQuery", "");
    setSearchResults([]);
  };

  // No need for onSearchSubmit as filtering happens in useEffect

  return (
    <div className="container mx-auto lg:px-4 px-2 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 ">
          <SvgUserplus className="text-viking-700 size-5 lg:size-6" />
          <h1 className="md:text-2xl font-bold text-viking-950">
            Patient Information Management
          </h1>
        </div>
        <button
          className="bg-viking-700 p-2 rounded-lg lg:hidden text-viking-50 shadow-md hover:bg-viking-800 transition-colors flex justify-center items-center"
          onClick={() => setShowMobileSearch(true)}
        >
          <SvgSearch />
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <main className="lg:col-span-1 bg-viking-100 rounded-lg p-3 lg:p-8 shadow-md">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-viking-900">
              Add New Patient
            </h2>
            <p className="text-viking-700 text-base">
              Enter patient information to start tracking their surgical
              progress.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="block text-viking-800 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  className="border border-viking-300 rounded-md px-4 py-1 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="block text-viking-800 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="border border-viking-300 rounded-md px-4 py-1 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </section>

            <div className="flex flex-col">
              <label
                htmlFor="streetAddress"
                className="block text-viking-800 mb-1"
              >
                Street Address
              </label>
              <input
                id="streetAddress"
                className="border border-viking-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200 w-full"
                {...register("streetAddress", {
                  required: "Street address is required",
                })}
              />
              {errors.streetAddress && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label htmlFor="city" className="block text-viking-800 mb-1">
                  City
                </label>
                <input
                  id="city"
                  className="border border-viking-300 rounded-md px-4 py-1 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="state" className="block text-viking-800 mb-1">
                  State
                </label>
                <input
                  id="state"
                  className="border border-viking-300 rounded-md px-4 py-1 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200"
                  {...register("state", { required: "State is required" })}
                />
                {errors.state && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="country" className="block text-viking-800 mb-1">
                  Country
                </label>
                <input
                  id="country"
                  className="border border-viking-300 rounded-md px-4 py-1 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200"
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </section>

            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="block text-viking-800 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                placeholder="+XXX XXXXXXXXXX"
                className="border border-viking-300 rounded-md px-4 py-1 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200 w-full"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+\d{1,3}\s?[\d\s]{9,15}$/,
                    message:
                      "Invalid phone number format. Expected: +XXX XXXXXXXXXX (allowing spaces)",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="contactEmail"
                className="block text-viking-800 mb-1"
              >
                Contact Email
              </label>
              <input
                id="contactEmail"
                placeholder="family@kfc.com"
                className="border border-viking-300 rounded-md px-4 py-1 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200 w-full"
                {...register("contactEmail", {
                  required: "Contact email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.contactEmail && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-viking-700  hover:cursor-pointer text-white py-2 lg:py-2 rounded-md flex justify-center items-center gap-2 hover:bg-viking-800 transition-colors w-full font-semibold"
            >
              <div className="flex justify-center items-center">
                <SvgClipboard className="text-viking-50 size-6" />
              </div>
              <span>Add Patient</span>
            </button>
          </form>
        </main>
        <div className="hidden lg:block lg:col-span-1 bg-viking-100 rounded-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-viking-900">
              Search Patients
            </h2>
            <p className="text-viking-700 text-base">
              Find existing patients by last name.
            </p>
          </div>
          <form className="flex items-center gap-2">
            <input
              className="outline flex-1 rounded-sm px-2 py-1 border border-viking-300 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter last name to search"
              {...registerSearch("searchQuery")}
            />
            <button
              type="button"
              className="bg-viking-400 rounded-full p-2 hover:cursor-pointer hover:bg-viking-500 transition-colors"
            >
              <SvgSearch className="text-viking-950" />
            </button>
            <button
              type="button"
              onClick={handleClearSearch}
              className="bg-viking-300 hover:bg-viking-400 text-xs hover:cursor-pointer font-semibold text-viking-950 px-2 py-1 rounded-sm"
            >
              Clear
            </button>
          </form>
          {searchResults.length > 0 ? (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <SvgUserplus className="text-viking-700 size-5" />
                <p className="text-viking-950 font-semibold">
                  Found {searchResults.length} patient(s)
                </p>
              </div>
              <div className="space-y-4">
                {searchResults.map((patient) => (
                  <div
                    key={patient.patientNumber}
                    className="bg-viking-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-bold text-viking-950">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-viking-700">
                      Patient Number: {patient.patientNumber}
                    </p>
                    <p className="text-sm text-viking-700">
                      Contact: {patient.phoneNumber} | {patient.contactEmail}
                    </p>
                    <p className="text-sm text-viking-700">
                      Address: {patient.streetAddress}, {patient.city},{" "}
                      {patient.state}, {patient.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            searchQuery && (
              <div className="mt-6 text-viking-700 text-center">
                <p>No patients found matching "{searchQuery}".</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-viking-950/70 backdrop-blur-lg z-50 flex flex-col items-center justify-start p-4 pt-20">
          <button
            className="absolute top-4 right-4 text-viking-50 border-2 border-viking-100 rounded-lg text-3xl"
            onClick={() => setShowMobileSearch(false)}
          >
            <SvgCancel className="p-1" />
          </button>
          <h2 className="text-2xl font-bold text-viking-50 mb-6">
            Search Patients
          </h2>

          <form className="w-full max-w-md">
            <div className="relative flex items-center">
              <SvgSearch className="absolute left-3 text-viking-50 size-6" />
              <input
                className="w-full rounded-md px-4 py-3 pl-10 pr-10 border border-viking-300 focus:ring-2 focus:ring-viking-500 focus:border-transparent transition-all duration-200 text-viking-50"
                placeholder="Enter last name to search"
                {...registerSearch("searchQuery")}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 bg-viking-100 rounded-full text-viking-50 hover:text-viking-900"
                >
                  <SvgCancel className="size-6 p-1 text-viking-950" />
                </button>
              )}
            </div>
          </form>

          {searchResults.length > 0 ? (
            <div className="mt-6 w-full max-w-md">
              <div className="flex items-center gap-2 mb-4 text-viking-50">
                <SvgUserplus className="size-6" />
                <p className="font-semibold">
                  Found {searchResults.length} patient(s)
                </p>
              </div>
              <div className="space-y-4">
                {searchResults.map((patient) => (
                  <div
                    key={patient.patientNumber}
                    className="bg-viking-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-bold text-viking-950">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-viking-700">
                      Patient Number: {patient.patientNumber}
                    </p>
                    <p className="text-sm text-viking-700">
                      Contact: {patient.phoneNumber} | {patient.contactEmail}
                    </p>
                    <p className="text-sm text-viking-700">
                      Address: {patient.streetAddress}, {patient.city},{" "}
                      {patient.state}, {patient.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            searchQuery && (
              <div className="mt-6 w-full max-w-md text-viking-50 text-center">
                <p>No patients found matching "{searchQuery}".</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default PatientInformation;

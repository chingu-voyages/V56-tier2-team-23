"use client";

import { SvgSearch, SvgUserplus } from "@/components/icons";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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

function PatientInformation() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div className="container mx-auto lg:px-4 px-2 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 ">
          <SvgUserplus className="text-steel-blue-700 size-5 lg:size-6" />
          <h1 className="md:text-2xl font-bold text-steel-blue-950">
            Patient Information Management
          </h1>
        </div>
        <button className="bg-steel-blue-700 p-3 rounded-full lg:hidden text-steel-blue-50 shadow-md hover:bg-steel-blue-800 transition-colors flex justify-center items-center">
          <SvgSearch />
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-steel-blue-900 mb-2">
          Add New Patient
        </h2>
        <p className="text-steel-blue-700 text-base">
          Enter patient information to start tracking their surgical progress.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <main className="lg:col-span-1 bg-steel-blue-100 rounded-lg p-3 lg:p-8 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="block text-steel-blue-800 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200"
                  {...register("firstName")}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="block text-steel-blue-800 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200"
                  {...register("lastName")}
                />
              </div>
            </section>

            <div className="flex flex-col">
              <label
                htmlFor="streetAddress"
                className="block text-steel-blue-800 mb-1"
              >
                Street Address
              </label>
              <input
                id="streetAddress"
                className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200 w-full"
                {...register("streetAddress")}
              />
            </div>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className="block text-steel-blue-800 mb-1"
                >
                  City
                </label>
                <input
                  id="city"
                  className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200"
                  {...register("city")}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="state"
                  className="block text-steel-blue-800 mb-1"
                >
                  State
                </label>
                <input
                  id="state"
                  className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200"
                  {...register("state")}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="block text-steel-blue-800 mb-1"
                >
                  Country
                </label>
                <input
                  id="country"
                  className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200"
                  {...register("country")}
                />
              </div>
            </section>

            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="block text-steel-blue-800 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                placeholder="(078) 356 8231"
                className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200 w-full"
                {...register("phoneNumber")}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="contactEmail"
                className="block text-steel-blue-800 mb-1"
              >
                Contact Email
              </label>
              <input
                id="contactEmail"
                placeholder="family@kfc.com"
                className="border border-steel-blue-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-steel-blue-500 focus:border-transparent transition-all duration-200 w-full"
                {...register("contactEmail")}
              />
            </div>

            <button
              type="submit"
              className="bg-steel-blue-700 text-white py-1 lg:py-2 rounded-md flex justify-center items-center space-x-3 hover:bg-steel-blue-800 transition-colors w-full font-semibold"
            >
              <div className="flex justify-center items-center">
                <SvgUserplus className="text-steel-blue-50 " />
              </div>
              <span>Add User</span>
            </button>
          </form>
        </main>
        <div className="hidden lg:block lg:col-span-1 bg-steel-blue-100 rounded-lg p-8">
          {/* This is the empty rectangle for future content */}
        </div>
      </div>
    </div>
  );
}

export default PatientInformation;

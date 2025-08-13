"use client";

import { useEffect } from "react";
import { usePatientStore } from "@/store/patientStore";
import { statusColors } from "@/utils/statusColors";

export default function ActivePatientCard() {
  const patients = usePatientStore((state) => state.patients);
  const setPatients = usePatientStore((state) => state.setPatients); // Make sure this exists in store

  // Poll database every 3 seconds
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/patients");
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients(); 
    const interval = setInterval(fetchPatients, 3000);
    return () => clearInterval(interval);
  }, [setPatients]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {patients.map((patient) => (
        <article
          key={patient.patientNumber}
          className="border-l-4 border-accentMain p-4 flex flex-col justify-center items-center rounded-2xl shadow-md bg-white"
        >
          <p className="font-semibold text-lg sm:text-xl text-center">
            {patient.patientNumber}
          </p>
          <p className="text-gray-600 text-sm sm:text-base text-center">
            {patient.lastName} {patient.firstName}
          </p>
          <div
            className={`mt-2 rounded-xl px-3 py-1 text-xs sm:text-sm ${
              statusColors[patient.status] || "bg-gray-300"
            }`}
          >
            {patient.status}
          </div>
        </article>
      ))}
    </div>
  );
}

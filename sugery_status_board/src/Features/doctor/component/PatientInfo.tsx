"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, User } from "lucide-react";
import { statusColors } from "@/utils/statusColors";
import { usePatientStore } from "@/store/patientStore";

const statusDescriptions: Record<string, string> = {
  "Checked In": "In the facility awaiting their procedure",
  "Pre-Procedure": "Undergoing surgical preparation",
  "In Progress": "Surgical procedure is underway",
  "Closing": "Surgery completed",
  "Recovery": "Patient transferred to post-surgery recovery room",
  "Complete": "Recovery completed, patient awaiting dismissal",
  "Dismissal": "Transferred to hospital room or patient has left",
};

interface PatientDetailsCardProps {
  patientNumber: string;
}

export default function PatientDetailsCard({ patientNumber }: PatientDetailsCardProps) {
  const patient = usePatientStore((state) => state.selectedPatient);
  const findPatientByPatientNumber = usePatientStore(
    (state) => state.findPatientByPatientNumber
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!patientNumber) return;

  let isMounted = true;
  setLoading(true);

  (async () => {
    await findPatientByPatientNumber(patientNumber);
    if (isMounted) setLoading(false);
  })();

  return () => {
    isMounted = false;
  };
}, [patientNumber, findPatientByPatientNumber]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-4">
        Loading patient details...
      </p>
    );
  }

  if (!patient) {
    return (
      <p className="text-center text-red-500 py-4">
        Patient not found or data unavailable.
      </p>
    );
  }

  const badgeClass = statusColors[patient.status] || "bg-slate-400 text-white";
  const description = statusDescriptions[patient.status] || "Status unknown";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-2xl mx-auto mt-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Details</h2>

      {/* Patient Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Name:</span> {patient.firstName} {patient.lastName}
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Email:</span> {patient.contactEmail}
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Phone:</span> {patient.phoneNumber}
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Address:</span>
          {patient.streetAddress}, {patient.city}, {patient.state}, {patient.country}
        </div>
      </div>

      {/* Status Info */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500 font-medium">Current Status</p>
        <div className="flex items-center gap-3 mt-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold shadow ${badgeClass}`}
          >
            {patient.status}
          </span>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

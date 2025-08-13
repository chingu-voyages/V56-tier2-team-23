"use client";

import { useState } from "react";
import { Status } from "@/types/patientStore";
import { usePatientStore } from "@/store/patientStore";

const workflowSteps: Status[] = [
  "Checked In",
  "Pre-Procedure",
  "In Progress",
  "Closing",
  "Recovery",
  "Complete",
  "Dismissal",
];

export default function StatusUpdateForm({ patientNumber }: { patientNumber: string }) {
  const patient = usePatientStore((state) => state.selectedPatient);
  const updatePatientStatus = usePatientStore((state) => state.updatePatientStatus);

  const [updating, setUpdating] = useState(false);

  if (!patient) return <div>Patient not found.</div>;

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;

    if (newStatus === patient.status) return;

    const currentIndex = workflowSteps.indexOf(patient.status);
    const newIndex = workflowSteps.indexOf(newStatus);

    if (newIndex > currentIndex + 1) {
      const skipCount = newIndex - currentIndex - 1;
      const proceed = window.confirm(
        `You're moving from "${patient.status}" to "${newStatus}" skipping ${skipCount} step${skipCount > 1 ? "s" : ""}. Continue?`
      );
      if (!proceed) return;
    }

    setUpdating(true);
    const result = await updatePatientStatus(patientNumber, newStatus);
    setUpdating(false);

    if (!result.success) {
      alert(`Error updating status: ${result.message}`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-2xl mx-auto mt-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Update Surgery Status</h2>

      <label htmlFor="status" className="text-sm text-gray-600">
        Select new status
      </label>

      <select
        id="status"
        value={patient.status}
        onChange={handleChange}
        disabled={updating}
        className="w-full text-sm border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      >
        <option value="">Choose a status...</option>
        {workflowSteps.map((step) => (
          <option key={step} value={step}>
            {step}
          </option>
        ))}
      </select>

      {updating && <p className="text-sm text-gray-500">Updating status…</p>}
    </div>
  );
}

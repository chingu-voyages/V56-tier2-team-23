import { Status } from "@/types/patientStore";

export const statusColors: Record<Status, string> = {
  "Checked In": "bg-blue-100 text-blue-800",
  "Pre-Procedure": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-orange-100 text-orange-800",
  "Closing": "bg-purple-100 text-purple-800",
  "Recovery": "bg-sky-100 text-sky-800",
  "Complete": "bg-green-100 text-green-800",
  "Dismissal": "bg-gray-100 text-gray-800",
};

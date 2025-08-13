import mongoose, { Schema, Document, Model } from "mongoose";
import { IPatients } from "@/types/patientStore";

export interface IPatientDocument extends Document, IPatients {
  statusHistory: { status: string; changedAt: Date; changedBy?: string }[];
}

const StatusHistorySchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        "Checked In",
        "Pre-Procedure",
        "In Progress",
        "Closing",
        "Recovery",
        "Complete",
        "Dismissal",
      ],
      required: true,
    },
    changedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    changedBy: {
      type: String,
    },
  },
  { _id: false }
);

const PatientSchema: Schema = new Schema(
  {
    patientNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    contactEmail: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "Checked In",
        "Pre-Procedure",
        "In Progress",
        "Closing",
        "Recovery",
        "Complete",
        "Dismissal",
      ],
      required: true,
    },
    statusHistory: {
      type: [StatusHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Patient: Model<IPatientDocument> =
  mongoose.models.Patient || mongoose.model<IPatientDocument>("Patient", PatientSchema);

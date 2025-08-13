import { connectDB } from "@/lib/mongodb";
import { Patient } from "@/models/patient";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  context: { params: Promise<{ patientNumber: string }> }
) {
  await connectDB();

  const { patientNumber } = await context.params;

  const patient = await Patient.findOne({ patientNumber });

  if (!patient) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(patient);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ patientNumber: string }> }
) {
  try {
    await connectDB();

    const { patientNumber } = await context.params;
    const { status, ...rest } = await req.json();

    const patient = await Patient.findOne({ patientNumber });

    if (!patient) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (status && status !== patient.status) {
      patient.statusHistory.push({
        status,
        changedAt: new Date(),
      });
      patient.status = status;
    }

    Object.assign(patient, rest);
    await patient.save();

    return NextResponse.json(patient, { status: 200 });
  } catch (error: unknown) {
    console.error("PUT /patients error:", error);
    const message = "Internal server error";
    if (error instanceof Error) {
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ patientNumber: string }> }
) {
  try {
    await connectDB();

    const { patientNumber } = await context.params;

    const deletedPatient = await Patient.findOneAndDelete({ patientNumber });

    if (!deletedPatient) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Patient deleted successfully", patient: deletedPatient },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("DELETE /patients error:", error);
    let message = "Internal server error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
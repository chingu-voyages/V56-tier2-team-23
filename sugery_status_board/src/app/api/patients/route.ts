import { connectDB } from "@/lib/mongodb";
import { Patient } from "@/models/patient";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newPatient = await Patient.create(body);
    return NextResponse.json(newPatient, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
    let message = "Unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const patients = await Patient.find();
    return NextResponse.json(patients);
  } catch (error: unknown) {
    let message = "Unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

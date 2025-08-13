import { create } from "zustand";
import { Status, IPatients } from "@/types/patientStore";

interface PatientState {
  patients: IPatients[];
  selectedPatient: IPatients | null;
  fetchPatients: () => Promise<void>;
  setPatients: (patients: IPatients[]) => void;
  setSelectedPatient: (patient: IPatients | null) => void;
  addPatient: (
    patient: Omit<IPatients, "patientNumber" | "status">
  ) => Promise<{ success: boolean; message: string }>;
  updatePatientStatus: (
    patientNumber: string,
    newStatus: Status
  ) => Promise<{ success: boolean; message: string }>;
  deletePatient: (
    patientNumber: string
  ) => Promise<{ success: boolean; message: string }>;
  findPatientByPatientNumber: (patientNumber: string) => Promise<void>;
  clearSelectedPatient: () => void;
}

export const usePatientStore = create<PatientState>((set, get) => {
  const apiCall = async <T>(
    url: string,
    options?: RequestInit
  ): Promise<{ success: boolean; data?: T; message?: string }> => {
    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");
      return { success: true, data };
    } catch (error: unknown) {
  console.error("API Error:", error);

  let message = "An unexpected error occurred";
  if (error instanceof Error) {
    message = error.message;
  }

  return { success: false, message };
}

  };

  return {
    patients: [],
    selectedPatient: null,

    //FetchPatients

    fetchPatients: async () => {
      const { success, data } = await apiCall<IPatients[]>("/api/patients");
      if (success && data) set({ patients: data });
    },

    setPatients: (patients) => set({ patients }),

    setSelectedPatient: (patient) => set({ selectedPatient: patient }),

//-----------------------------------------------------
    //Find_The_Patient_By_Patient_Number

    findPatientByPatientNumber: async (patientNumber) => {
      const { success, data } = await apiCall<IPatients>(
        `/api/patients/${patientNumber}`
      );
      set({ selectedPatient: success ? data! : null });
    },

    clearSelectedPatient: () => set({ selectedPatient: null }),

    addPatient: async (patient) => {
      const { success, data, message } = await apiCall<IPatients>(
        "/api/patients",
        {
          method: "POST",
          body: JSON.stringify(patient),
        }
      );

      if (success && data) {
        set({ patients: [...get().patients, data] });
        return {
          success: true,
          message: `Successfully added patient ${data.patientNumber}!`,
        };
      }
      return { success: false, message: message || "Failed to add patient." };
    },

//-------------------------------------------------------------------

    //Update_The_Patient_By_Patient_Number

    updatePatientStatus: async (patientNumber, newStatus) => {
      const prevPatients = get().patients;
      const prevSelected = get().selectedPatient;
      set({
        patients: prevPatients.map((p) =>
          p.patientNumber === patientNumber ? { ...p, status: newStatus } : p
        ),
        selectedPatient:
          prevSelected?.patientNumber === patientNumber
            ? { ...prevSelected, status: newStatus }
            : prevSelected,
      });

      const { success, message } = await apiCall(
        `/api/patients/${patientNumber}`,
        {
          method: "PUT",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!success) {
        set({ patients: prevPatients, selectedPatient: prevSelected });
        return { success: false, message: message || "Failed to update status" };
      }

      return { success: true, message: "Patient status updated." };
    },

//------------------------------------------------------------------------

    //Delete_Patient_By_Patient_Number
    
    deletePatient: async (patientNumber) => {
      const prevPatients = get().patients;
      const prevSelected = get().selectedPatient;
      set({
        patients: prevPatients.filter(
          (p) => p.patientNumber !== patientNumber
        ),
        selectedPatient:
          prevSelected?.patientNumber === patientNumber ? null : prevSelected,
      });

      const { success, message } = await apiCall(
        `/api/patients/${patientNumber}`,
        { method: "DELETE" }
      );

      if (!success) {
        set({ patients: prevPatients, selectedPatient: prevSelected });
        return { success: false, message: message || "Failed to delete patient" };
      }

      return { success: true, message: "Patient deleted successfully." };
    },
  };
});
// -------------------------------------------
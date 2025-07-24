import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Patient {
  patientNumber: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  contactEmail: string;
}

interface PatientStore {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  // You can add more actions here, e.g., removePatient, updatePatient
}

export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patients: [],
      addPatient: (patient) =>
        set((state) => ({ patients: [...state.patients, patient] })),
    }),
    {
      name: 'patient-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

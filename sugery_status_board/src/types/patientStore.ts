export type Status = "Checked In"|"Pre-Procedure"|"In Progress"|"Closing"|"Recovery"|"Complete"|"Dismissal"
export interface IPatients{
    patientNumber: string,
    firstName: string,
    lastName: string,
    streetAddress: string,
    city: string,
    state: string,
    country: string,
    phoneNumber: string,
    contactEmail: string,
    status:  Status
}
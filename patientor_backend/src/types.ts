export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface DiagnoseEntry {
    code : string;
    name : string;
    latin?: string;
}

export interface PatientEntry {
    id : string;
    name : string;
    dateOfBirth : string;
    ssn : string;
    gender : Gender; 
    entries : Entry[];
    occupation : string;
}

export type Fields = {
    name : unknown,
    dateOfBirth : unknown,
    ssn : unknown,
    gender : unknown,
    occupation : unknown
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries'>;

export type PublicPatient  = Omit<PatientEntry,'ssn' | 'entries'>;
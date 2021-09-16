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
    occupation : string;
}

export type Fields = {
    name : unknown,
    dateOfBirth : unknown,
    ssn : unknown,
    gender : unknown,
    occupation : unknown
};

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonSentivePatientEntry = Omit<PatientEntry,'ssn'>;
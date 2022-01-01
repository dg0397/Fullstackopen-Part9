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

export type BaseEntry = {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
    type: string;
};

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export type DischargeType = {
    date: string,
    criteria: string
};

export type DischargeFields = {
    date : unknown,
    criteria: unknown
};

export type SickLeave = {
    startDate: string;
    endDate: string
};

export type SickLeaveFields = {
    startDate: unknown;
    endDate: unknown
};

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: DischargeType;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave; 
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries'>;

export type PublicPatient  = Omit<PatientEntry,'ssn' | 'entries'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

type EntryBaseFields = {
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes?: unknown,
    type: unknown
};

interface HealthCheckEntryFields extends EntryBaseFields {
    type: 'HealthCheck';
    healthCheckRating: unknown;
}

interface HospitalEntryFields extends EntryBaseFields {
    type: 'Hospital';
    discharge: unknown;
}

interface OccupationalHealthcareEntryFields extends EntryBaseFields {
    type: 'OccupationalHealthcare';
    employerName: unknown;
    sickLeave?: unknown; 
}

export type EntryFields =
  | HospitalEntryFields
  | OccupationalHealthcareEntryFields
  | HealthCheckEntryFields;

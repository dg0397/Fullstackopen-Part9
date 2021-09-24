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

type BaseEntry = {
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

type DischargeType = {
    date: string,
    criteria: string
};

type SickLeave = {
    startDate: string;
    endDate: string
};

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: DischargeType;
}

interface OccupationalHealthcareEntry extends BaseEntry {
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
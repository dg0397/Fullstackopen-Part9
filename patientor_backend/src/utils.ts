import { NewPatientEntry , Gender , Fields, EntryWithoutId, EntryFields, DiagnoseEntry, HealthCheckEntry, HealthCheckRating, HospitalEntry, DischargeType, DischargeFields, OccupationalHealthcareEntry, SickLeave, SickLeaveFields } from "./types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any):gender is Gender => {
    return Object.values(Gender).includes(gender);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating : any): healthCheckRating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const isDischargeFields = (discharge:unknown) : discharge is DischargeFields =>{
    return Object.getOwnPropertyNames(discharge).includes('date') && Object.getOwnPropertyNames(discharge).includes('criteria');
};

const isSickLeaveFields = (sickLeave: unknown) : sickLeave is SickLeaveFields =>{
    return Object.getOwnPropertyNames(sickLeave).includes('startDate') && Object.getOwnPropertyNames(sickLeave).includes('endDate');
};

const isSickLeaveType = (sickLeave : SickLeaveFields) : SickLeave => {
    const sickLeaveObj : SickLeave = {
        startDate : parseDate(sickLeave.startDate),
        endDate : parseDate(sickLeave.endDate)
    };
    return sickLeaveObj;
};

const isDischargeType = (discharge: DischargeFields) : DischargeType => {
    const dischargeObj : DischargeType = {
        date : parseDate(discharge.date),
        criteria : parseDescription(discharge.date)
    };
    return dischargeObj;
};
const isArray = (array:unknown):array is Array<string> => {
    return Array.isArray(array) && array.every( e => typeof e === 'string');
};

const isDiagnosisCodes = (diagnosisCodes: Array<string>): diagnosisCodes is Array<DiagnoseEntry['code']> => {
    return diagnosisCodes.every(e => e.length >= 3);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
};
const parseDateOfBirth = (dateOfBirth : unknown) : string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date');
    }
    return dateOfBirth;
};
const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing SSN');
    }
  
    return ssn;
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
};
const parseGender = (gender : unknown) : Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export const toNewPatientEntry = (object : Fields) : NewPatientEntry => {
    const newEntry : NewPatientEntry = {
        name : parseName(object.name),
        ssn : parseSsn(object.ssn),
        occupation : parseOccupation(object.occupation),
        dateOfBirth : parseDateOfBirth(object.dateOfBirth),
        gender : parseGender(object.gender)
    };
    return newEntry;
}; 

const parseDescription = (description : unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    
    return description;
};

const parseDate = (date : unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist : unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    
    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes : unknown): Array<DiagnoseEntry['code']> => {
    if(!diagnosisCodes || !isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)){
        throw new Error('Incorrect or missing diagnosisCodes');
    }
    return diagnosisCodes;
};

const parseType = (type:unknown) : string=> {
    if(!type || !isString(type)){
        throw new Error('Incorrect or missing type');
    }
    return type;
};

const parseEmployerName = (employerName:unknown) : string=> {
    if(!employerName || !isString(employerName)){
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};

const parseTypeHealthCheck = (type:string): "HealthCheck" => {
    if(type !== "HealthCheck"){
        throw new Error('Incorrect or missing type');
    }
    return type;
};
const parseTypeHospitalEntry = (type:string): "Hospital" => {
    if(type !== "Hospital"){
        throw new Error('Incorrect or missing type');
    }
    return type;
};
const parseTypeOccupationalHealthcare = (type:string): "OccupationalHealthcare" => {
    if(type !== "OccupationalHealthcare"){
        throw new Error('Incorrect or missing type');
    }
    return type;
};

const parseHealthCheckRating = (healthCheckRating : unknown) : HealthCheckRating => {
    if(!(typeof healthCheckRating === 'number') || !isHealthCheckRating(healthCheckRating)){
        throw new Error('Incorrect or missing healthCheckRating: ' + JSON.stringify(healthCheckRating));
    }
    return healthCheckRating;
}; 
const parseDischarge = (discharge : unknown) : DischargeType => {
    if(!discharge || !isDischargeFields(discharge)){
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return isDischargeType(discharge);
};
const parseSickLeave = (sickLeave : unknown) : SickLeave => {
    if(!sickLeave || !isSickLeaveFields(sickLeave)){
        throw new Error('Incorrect or missing sick leave: ' + JSON.stringify(sickLeave));
    }
    return isSickLeaveType(sickLeave);
};
export const toNewEntryData = (object : EntryFields ): EntryWithoutId => {
    switch (object.type) {
        case "HealthCheck":{
            const newEntryData : Omit<HealthCheckEntry,'id'> = {
                description : parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: parseTypeHealthCheck(parseType(object.type)),
                healthCheckRating : parseHealthCheckRating(object.healthCheckRating)
            };
            return newEntryData;
        }
        case "Hospital":{
            const newEntryData : Omit<HospitalEntry,'id'> = {
                description : parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: parseTypeHospitalEntry(parseType(object.type)),
                discharge : parseDischarge(object.discharge)
            };
            return newEntryData;
        }
        case "OccupationalHealthcare":{
            const newEntryData : Omit<OccupationalHealthcareEntry,'id'> = {
                description : parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: parseTypeOccupationalHealthcare(parseType(object.type)),
                employerName : parseEmployerName(object.employerName),
                sickLeave : parseSickLeave(object.sickLeave),
            };
            return newEntryData;
        }
    }
};
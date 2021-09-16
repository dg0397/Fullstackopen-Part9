import { NewPatientEntry , Gender , Fields } from "./types";


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